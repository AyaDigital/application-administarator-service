import React, { useState, useEffect } from 'react';

import {
	Button,
	Input as TextField,
	FormControl,
	FormLabel,
	Grid,
	GridItem,
	Checkbox,
	Spinner
} from '@chakra-ui/react';

import {
	useCreateEmergencyMutation,
	useGetEmergencyByIdQuery,
	useUpdateEmergencyMutation,
} from '_store';

import '../emergencies.scss';

const HEALTHCARE_ORG_TYPE_CODE = "ins";

const CreateEmergencyForm = ({
	id = null,
	onClose
}) => {
	const [updateEmergency, {isLoading: IsEmergencyUpdating, isSuccess: IsEmergencyUpdated}] = useUpdateEmergencyMutation();
	const [createEmergency, { isLoading: IsEmergencyCreating, isSuccess: isEmergencyCreated }] = useCreateEmergencyMutation();
	const [skip, setSkip] = useState(true);

	const {isLoading: isOneInsuranceFetching, isSuccess: isOneEmergencyFetched, data: oneInsurance} = useGetEmergencyByIdQuery(id, {
		skip
	});

	const [name, setName] = useState();
	const [code, setCode] = useState();
	const [isActive, setIsActive] = useState();

	useEffect(() => {
		setName(oneInsurance?.name);
		setCode(oneInsurance?.code);
		setIsActive(oneInsurance?.active);
	}, [oneInsurance, isOneEmergencyFetched])

	useEffect(() => {
		if (id) {
			setSkip(false)
		}
	}, [id]);

	useEffect(() => {
		if (isEmergencyCreated || IsEmergencyUpdated) {
			onClose();
		}
	}, [isEmergencyCreated, onClose, IsEmergencyUpdated])

	return (
		<div className='emergency-form-layout'>
			<>
			{
				(IsEmergencyCreating || isOneInsuranceFetching || IsEmergencyUpdating) ? (
					
						<Spinner
							thickness='4px'
							speed='0.65s'
							emptyColor='gray.200'
							color='blue.500'
							size='xl'
						/>
				) : (
						<Grid
							//gridTemplateRows={'100px'}
							gridTemplateColumns={'50% 50%'}
							//w='450px'
							h='auto'
							rowGap='5'
							gap='1'
							alignItems={'center'}
							color='blackAlpha.700'
							fontWeight='bold'
						>
							<GridItem colSpan={2}>
								<FormControl variant="floating">
									<TextField
										required
										h='50px'
										placeholder=" "
										id="outlined-controlled"
										value={code}
										onChange={(event) => {
											setCode(event.target.value);
										}}
									/>
									<FormLabel>Code</FormLabel>
								</FormControl>
							</GridItem>
							<GridItem colSpan={2}>
								<FormControl variant="floating">
									<TextField
										required
										h='50px'
										placeholder=" "
										id="outlined-controlled"
										value={name}
										onChange={(event) => {
											setName(event.target.value);
										}}
									/>
									<FormLabel>Name</FormLabel>
								</FormControl>
							</GridItem>
							<GridItem h='50px' colSpan={2} className='verification-block'>
										<div className='checkbox'>
											<div>Not active</div>
											<Checkbox
												value='not-active'
												// onChange={onChangeActive}
												disabled={false}
											/>
										</div>
									</GridItem>
							<GridItem rowSpan={1} colSpan={1} textAlign={'center'}>
								<Button
									w='180px'
									h='50px'
									variant='outline'
									colorScheme='teal'
									size='xl'
									onClick={onClose}
								>
									Close
								</Button>
							</GridItem>
							<GridItem rowSpan={1} colSpan={1} textAlign={'center'}>
								<Button
									colorScheme='teal'
									variant='outline'
									isDisabled={!code || !name}
									w='180px'
									h='50px'
									size='xl'
									onClick={() => {
										const orgData = {
											name,
											// active: isActive,
											code: HEALTHCARE_ORG_TYPE_CODE
										};
										if (id) {
											updateEmergency({id, data: orgData})
										} else {
											createEmergency(orgData);
										}
									}}
								>
									Save
								</Button>
							</GridItem>
						</Grid>
				)
			}
			</>
		</div>
	)
};

export { CreateEmergencyForm };
