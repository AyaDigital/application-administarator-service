import React, { useState, useEffect } from 'react';

import {
	Button,
	Input as TextField,
	Textarea,
	FormControl,
	FormLabel,
	Grid,
	GridItem,
	Checkbox,
	Spinner
} from '@chakra-ui/react';

import {
	useCreateLanguageMutation,
	useEditLanguageMutation,
} from '_store';

import '../languages.scss';

const HEALTHCARE_ORG_TYPE_CODE = "ins";

const CreateDegree = ({
	id = null,
	onClose
}) => {
	const [updateItem, {isLoading: IsEmergencyUpdating, isSuccess: IsEmergencyUpdated}] = useEditLanguageMutation();
	const [createItem, { isLoading: IsEmergencyCreating, isSuccess: isEmergencyCreated }] = useCreateLanguageMutation();


	const [name, setName] = useState();
	const [description, setDescription] = useState();
	const [code, setCode] = useState();
	const [isActive, setIsActive] = useState();

	useEffect(() => {
		if (isEmergencyCreated || IsEmergencyUpdated) {
			onClose();
		}
	}, [isEmergencyCreated, onClose, IsEmergencyUpdated])

	return (
		<div className='emergency-form-layout'>
			<>
			{
				(IsEmergencyCreating || IsEmergencyUpdating) ? (
					
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
											code
										};
										if (id) {
											updateItem({id, data: orgData})
										} else {
											createItem(orgData);
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

export { CreateDegree };
