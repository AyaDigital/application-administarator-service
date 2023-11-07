import React, { useState, useEffect } from 'react';
import InputMask from "react-input-mask";
import upperfirst from 'lodash.upperfirst';
import dayjs, { Dayjs } from 'dayjs';
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
	useCreatePractitionerMutation,
} from '_store';

import '../practitioners.scss';

const CreatePractitionerForm = ({
	onClose
}) => {
	const [ createPractitioner, { isLoading, isSuccess }] = useCreatePractitionerMutation();
	const [firstName, setFirstName] = useState();
	const [lastName, setLastName] = useState();
	const [middleName, setMiddleName] = useState();
	const [email, setEmail] = useState();
	const [phone, setPhone] = useState('');

	useEffect(() => {
		if (isSuccess) {
			onClose();
		}
	}, [isSuccess, onClose])

	return (
		<div className='practitioner-form-layout'>
			<>
			{
				isLoading ? (
					
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
							gridTemplateColumns={'100px 100px 100px 100px 100px 100px'}
							w='650px'
							h='auto'
							rowGap='10'
							gap='1'
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
										value={firstName}
										onChange={(event) => {
											setFirstName(event.target.value);
										}}
									/>
									<FormLabel>First name</FormLabel>
								</FormControl>
							</GridItem>
							<GridItem colSpan={2}>
								<FormControl variant="floating">
									<TextField
											required
											h='50px'
											placeholder=" "
											id="outlined-controlled"
											value={lastName}
											onChange={(event) => {
												setLastName(event.target.value);
											}}
									/>
									<FormLabel>Last name</FormLabel>
								</FormControl>
							</GridItem>
							<GridItem colSpan={2}>
								<FormControl variant="floating">
									<TextField
											required
											h='50px'
											placeholder=" "
											id="outlined-controlled"
											value={middleName}
											onChange={(event) => {
												setMiddleName(event.target.value);
											}}
									/>
									<FormLabel>Middle name</FormLabel>
								</FormControl>
							</GridItem>

							<GridItem colSpan={3}>
								<FormControl variant="floating">
									<TextField
										value={email}
										h='50px'
										id="outlined-controlled"
										onChange={(event) => {
											setEmail(event.target.value);
										}}
										placeholder=" "
									/>
									<FormLabel>Email</FormLabel>
								</FormControl>
							</GridItem>
							<GridItem colSpan={3}>
								<FormControl variant="floating">
									<TextField
										h='50px'
										disabled
										value={phone}
										id="outlined-controlled"
										placeholder=" "
									/>
									<FormLabel>Phone</FormLabel>
								</FormControl>
							</GridItem>

							<GridItem rowSpan={1} colSpan={3} textAlign={'center'}>
								<Button
									w='220px'
									h='50px'
									variant='outline'
									colorScheme='teal'
									size='xl'
									onClick={onClose}
								>
									Close
								</Button>
							</GridItem>
							<GridItem rowSpan={1} colSpan={3} textAlign={'center'}>
								<Button
									colorScheme='teal'
									variant='outline'
									w='220px'
									h='50px'
									size='xl'
									onClick={() => createPractitioner({
										firstname: firstName,
										lastname: lastName,
										email,
										phone,
										active: true
									})}
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

export { CreatePractitionerForm };