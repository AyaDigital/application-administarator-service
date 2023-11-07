import React, { useState, useEffect } from 'react';

import {
	Button,
	Input as TextField,
	FormControl,
	FormLabel,
	Grid,
	GridItem,
	Spinner
} from '@chakra-ui/react';

import {
	useCreateSpecialityMutation,
	useUpdateSpecialityMutation,
} from '_store';

import '../specialities.scss';

const CreateSpecialityForm = ({
	specialityId = null,
	data,
	onClose
}) => {
	const [updateSpeciality, {isLoading: isUpdateClinicLoading, isSuccess: isUpdateClinicSuccess}] = useUpdateSpecialityMutation();
	const [createSpeciality, { isLoading, isSuccess, data: newSpeciality }] = useCreateSpecialityMutation();

	const [name, setName] = useState();
	const [description, setDescription] = useState();
	const [code, setCode] = useState();

	useEffect(() => {
		setName(data.name);
		setDescription(data.description);
		setCode(data.code);
	}, [data])

	return (
		<div className='clinics-form-layout'>
			<>
			{
				(isLoading || isUpdateClinicLoading) ? (
					
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
										value={name}
										onChange={(event) => {
											setName(event.target.value);
										}}
									/>
									<FormLabel>Name</FormLabel>
								</FormControl>
							</GridItem>
							<GridItem colSpan={2}>
								<FormControl variant="floating">
									<TextField
											required
											h='50px'
											placeholder=" "
											id="outlined-controlled"
											value={description}
											onChange={(event) => {
												setDescription(event.target.value);
											}}
									/>
									<FormLabel>Description</FormLabel>
								</FormControl>
							</GridItem>
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
									w='180px'
									h='50px'
									size='xl'
									onClick={() => {
										const orgData = {
											name,
											description,
											code
										};
										if (specialityId) {
											updateSpeciality({id: specialityId, ...orgData})
										} else {
											createSpeciality(orgData);
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

export { CreateSpecialityForm };
