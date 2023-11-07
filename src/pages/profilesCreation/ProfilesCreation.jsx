import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import { Checkbox } from '@chakra-ui/react';
import clone from 'lodash/clone';
import 'styles/assets/pagination.scss';
import { Divider } from '@chakra-ui/react'
import Loader from '../../_components/Loader';
import { validateEmail } from '_helpers/utils';
import {
	Button,
	Select,
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	Grid,
	GridItem,
	Input as TextField,
	InputGroup,
	Input,
	InputRightElement,
	FormControl,
	FormLabel,
	FormErrorMessage
  } from '@chakra-ui/react';

import {
	useCreateProfileMutation,
    useFetchRolesQuery
} from '_store';

import './profillesCreation.scss';
import {  } from "react-router-dom";

const ProfilesManagement = () => {
	const navigate = useNavigate();
	const [firstName, setFirstName] = useState();
	const [lastName, setLastName] = useState();
	const [password, setPassword] = useState();
	const [repeatPassword, setRepeatPassword] = useState();
	const [isActive, setIsActive] = useState(false);
	const [isVerified, setIsVerified] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [isControlActive, setIsControlActive] = useState(false);
	const [validError, setValidError] = useState(false);
	const [error, setError] = useState(false);
	const [email, setEmail] = useState();
	const [isEmailError, setIsEmailError] = useState(false);
	const [roles, setRoles] = useState([]);

	const [ createProfile, { isLoading, isSuccess, data: newProfile }] = useCreateProfileMutation();
	const { data: rolesList = [] } = useFetchRolesQuery();

	useEffect(() => {
		const validpassword = new RegExp(/(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*){0,8}/g);
		setValidError(password && !validpassword.test(password))
		if (password && repeatPassword) {
			if (password !== repeatPassword) {
				setError(true);
			} else {
				setError(false);
			}
		}
		if (!password && !repeatPassword) {
			setError(false);
		}
	}, [repeatPassword, password])

	useEffect(() => {
		const emailError = !validateEmail(email);
		const isDataValid = email && firstName && lastName && password && repeatPassword && !error && !emailError;
		setIsEmailError(emailError);
		setIsControlActive(isDataValid);
	}, [firstName, lastName, password, repeatPassword, error, email])

	const onChangeActive = ({ target: {value, checked} }) => {
		setIsActive(checked)
	}

	const onChangeVerified = ({ target: {value, checked} }) => {
		setIsVerified(checked)
	}

	const handleRemoveRole = (role) => {
		const filtered = roles.filter(item => item !== String(role));
		setRoles(filtered)
	}

	const handleAddRole = (role) => {
		const newRoles = clone(roles);
		newRoles.push(role)
		setRoles(newRoles)
	}

	const handleShowPassword = () => {
		setShowPassword(!showPassword);
	}

	const handleCreateProfile = () => {
		const data = {
			firstName,
			lastName,
			email,
			password: password,
			confirm_password: repeatPassword,
			active: isActive,
			verified: isVerified,
			"roles":[
				"ROLE_PRACTITIONER"
			]
		}
		createProfile(data);
	}

	useEffect(() => {
		if (isSuccess && newProfile.uuid) {
			navigate('/profile/edit/' + newProfile.uuid)
		}
	}, [isSuccess, newProfile])

	return (
			<div className='settings-layout'>
				<Breadcrumb
					fontWeight='medium'
					fontSize='sm'
				>
					<BreadcrumbItem>
						<BreadcrumbLink
							color='gray.500'
							onClick={() => {navigate('/')}}
						>
							Home
						</BreadcrumbLink>
					</BreadcrumbItem>

					<BreadcrumbItem>
						<BreadcrumbLink
							color='gray.500'
							onClick={() => {navigate('/profiles')}}
						>
							Profiles
						</BreadcrumbLink>
					</BreadcrumbItem>

					<BreadcrumbItem>
						<BreadcrumbLink
							href='#'
							isCurrentPage
							color='gray.500'
						>
							Profile creation
						</BreadcrumbLink>
					</BreadcrumbItem>

				</Breadcrumb>
				<div className='settings-block'>
					<Divider />
					<div className='title'>Create profile</div>
				{
					isLoading ? (
						<Loader height='500px' width={'100%'} />
					) : (
						<>
							
							<div className={`advanced-block`} >
								<Grid
									gridTemplateRows={'minmax(50px, auto) repeat(5, 1fr) auto'}
									gridAutoRows={'max-content'}
									gridTemplateColumns={'250px 250px 250px'}
									w='300px'
									h='700px'
									rowGap='20px'
									gap='20px'
									color='blackAlpha.700'
									fontWeight='bold'
								>
									<GridItem h='50px' colSpan={1} className='label'>
										Enter E-mail
									</GridItem>
									<GridItem colSpan={2}>
										
										<FormControl isInvalid={email && isEmailError}>
											<TextField
												required
												h='50px'
												placeholder=" "
												type='email'
												id="outlined-controlled"
												value={email}
												onChange={(event) => {
													setEmail(event.target.value);
												}}
											/>
											{isEmailError ? (
												<FormErrorMessage>Email is not valid</FormErrorMessage>
											) : null}
										</FormControl>
									</GridItem>
									<GridItem h='50px' colSpan={1} className='label'>
										Enter First Name
									</GridItem>
									<GridItem h='50px' colSpan={2}>
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
									</GridItem>
									<GridItem h='50px' colSpan={1} className='label'>
										Enter Last Name
									</GridItem>
									<GridItem h='50px' colSpan={2}>
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
									</GridItem>
									<GridItem h='50px' colSpan={1} className='label'>
										Enter Password
									</GridItem>
									<GridItem h='auto' colSpan={2}>
										<FormControl isInvalid={validError}>
											<InputGroup size='md'>
												<Input
													h='50px'
													pr='4.5rem'
													isInvalid={validError}
													type={showPassword ? 'text' : 'password'}
													placeholder='Enter password'
													value={password}
													onChange={(event) => {
														setPassword(event.target.value);
													}}
												/>
												<InputRightElement h='50px' width='4.5rem'>
													<Button h='1.75rem' size='sm' onClick={handleShowPassword}>
														{showPassword ? 'Hide' : 'Show'}
													</Button>
												</InputRightElement>
											</InputGroup>
											{validError ? (
													<FormErrorMessage>
														Password must contain at least one digit, one uppercase character, one special symbol
													</FormErrorMessage>
												) : null}
										</FormControl>
									</GridItem>
									<GridItem h='50px' colSpan={1} className='label'>
										Repeat Password
									</GridItem>
									<GridItem h='50px' colSpan={2}>
										<FormControl isInvalid={error}>
											<InputGroup size='md'>
												<Input
													h='50px'
													pr='4.5rem'
													isInvalid={error}
													type={showPassword ? 'text' : 'password'}
													placeholder='Repeat password'
													value={repeatPassword}
													onChange={(event) => {
														setRepeatPassword(event.target.value);
													}}
												/>
												<InputRightElement h='50px' width='4.5rem'>
													<Button h='1.75rem' size='sm' onClick={handleShowPassword}>
														{showPassword ? 'Hide' : 'Show'}
													</Button>
												</InputRightElement>
											</InputGroup>
											{error ? (
												<FormErrorMessage>Passwords are not equal.</FormErrorMessage>
											) : null}
										</FormControl>
									</GridItem>


									<GridItem h='50px' colSpan={1} className='label'>
										Verified filters
									</GridItem>
									<GridItem h='50px' colSpan={1} className='verification-block'>
										<div className='checkbox'>
											<div>Not active</div>
											<Checkbox
												value='not-active'
												onChange={onChangeActive}
												disabled={false}
											/>
										</div>
									</GridItem>
									<GridItem h='50px' colSpan={1} className='verification-block'>
										<div className='checkbox'>
											<div>Not verified</div>
											<Checkbox
												value='not-verified'
												onChange={onChangeVerified}
												disabled={false}
											/>
										</div>
									</GridItem>
									{
										roles.length ? (
											<GridItem h='auto' colSpan={3}>
												<div className='items-cloud'>
													{
														roles.map((item) => {
															return (
																<Button
																	colorScheme='yellow'
																	disableRipple={true}
																	onClick={() => handleRemoveRole(item)}
																>
																	{rolesList.find(role => role.code === item)['name']}
																</Button>
																)
														})
													}
												</div>
											</GridItem>
										) : <GridItem h='0px' colSpan={3} />
									}

									<GridItem h='50px' colSpan={1} className='label'>
										Select roles
									</GridItem>
									<GridItem h='50px' colSpan={2}>
										<Select
											placeholder='Select option'
											h='50px'
											// multiple
											// value={''}
											onChange={(event) => {
												handleAddRole(event.target.value);
											}}
										>
											{
												rolesList.map(({code, name}, index) => (
													<option key={index} value={code}>{name}</option>
												))
											}
										</Select>
									</GridItem>
									
									<GridItem h='50px' colSpan={1}>
										<div className='control'>
											<Button
												w='100%'
												h='50px'
												isDisabled={!isControlActive}
												variant='outline'
												colorScheme='green'
												size='xl'
												onClick={() => {
													// setFiltersHidden(!filtersHidden)
												}}
											>
												Apply
											</Button>
										</div>
									</GridItem>
									<GridItem h='50px' colSpan={1}>
										<div className='control'>
											<Button
												w='100%'
												h='50px'
												isDisabled={!isControlActive}
												variant='outline'
												colorScheme='green'
												size='xl'
												onClick={handleCreateProfile}
											>
												Save and continue editing
											</Button>
										</div>
									</GridItem>
									<GridItem h='50px' colSpan={1}>
										<div className='control'>
												<Button
													w='100%'
													h='50px'
													variant='outline'
													colorScheme='red'
													size='xl'
													onClick={() => {
														// setFiltersHidden(!filtersHidden)
													}}
												>
													Clear
												</Button>
										</div>
									</GridItem>
								</Grid>
							</div>
							<Divider />
							<div className='table-profiles'></div>
						</>
					)
				}
				</div>
			</div>
	)
};

export { ProfilesManagement };
