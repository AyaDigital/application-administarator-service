import React, { useState, useEffect } from 'react';
import { Select } from '@chakra-ui/react';
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
	useCreateCityMutation,
	useUpdateCityMutation,
	useFetchStatesQuery
} from '_store';

import '../cities.scss';

const CreateCityForm = ({
	cityId = null,
	data,
	onClose
}) => {
	const [updateCity, {isLoading: isUpdateCityLoading, isSuccess: isUpdateSitySuccess}] = useUpdateCityMutation();
	const { data: states = [] } = useFetchStatesQuery();
	const [createCity, { isLoading, isSuccess, data: newSpeciality }] = useCreateCityMutation();
	const [currentState, setCurrentState] = useState();
	const [name, setName] = useState();
	const [description, setDescription] = useState();
	const [code, setCode] = useState();
	console.log('data', data)
	useEffect(() => {
		setName(data.name);
		setCurrentState(data.state.id);
		setCode(data.code);
	}, [data])

	return (
		<div className='clinics-form-layout'>
			<>
			{
				(isLoading || isUpdateCityLoading) ? (
					
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
									<Select
											placeholder='Select state'
											h='50px'
											value={currentState}
											onChange={(event) => {
												setCurrentState(event.target.value);
											}}
									>
										{
											states.map(({id, name}) => {
												return (
													<option selected={id === currentState} value={id}>{name}</option>
												)
											})
										}
									</Select>
									<FormLabel>Select state</FormLabel>
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
											code,
											stateId: Number(currentState)
										};
										if (cityId) {
											updateCity({id: cityId, ...orgData})
										} else {
											createCity(orgData);
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

export { CreateCityForm };
