import React, { useState, useEffect } from 'react';
import { Checkbox } from '@chakra-ui/react';
import clone from 'lodash/clone';
import { ModalForm } from '_components/controls/modal';
import {
	Button,
	Select,
	Input as TextField,
	InputGroup,
	Input,
	InputRightElement,
	FormControl,
	Grid,
	GridItem,
	Spinner,
	FormErrorMessage,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
} from '@chakra-ui/react';

import {
	useUpdateProfileMutation,
	useFetchRolesQuery,
	useUpdateCredentialsMutation
} from '_store';

import '../../profilesEdition.scss';

const BaseData = ({
	id,
	isLoading,
	isSuccess,
	profile
}) => {
	const [firstName, setFirstName] = useState();
	const [lastName, setLastName] = useState();
	const [password, setPassword] = useState();
	const [repeatPassword, setRepeatPassword] = useState();
	const [email, setEmail] = useState();
	const [isActive, setIsActive] = useState(false);
	const [isVerified, setIsVerified] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [roles, setRoles] = useState([]);
	const [error, setError] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [validError, setValidError] = useState(false);

	const [ updateProfile, {isLoading: isProfileUpdating, isSuccess: isProfileUpdated}] = useUpdateProfileMutation();
	const [ updatePassword, {isLoading: isCredentialsUpdating, isSuccess: isCredentialsUpdated}] = useUpdateCredentialsMutation();
	const { data: rolesList = [] } = useFetchRolesQuery();

	const handleModalClose = () => setIsModalOpen(false);
	const handleModalOpen = () => setIsModalOpen(true);

	useEffect(() => {
		if (profile) {
			setEmail(profile.email);
			setFirstName(profile.firstName);
			setLastName(profile.lastName);
			setIsVerified(profile.verified);
			setIsActive(profile.active);
			setRoles(profile?.roles || [])
		}
	}, [profile, isSuccess])

	useEffect(() => {
		handleModalClose();
	}, [isCredentialsUpdated])

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

	const handleUpdate = () => {
		const patchData = {
			"firstName": firstName,
			"lastName": lastName,
			"email": email,
			"active": isActive,
			"verified": isVerified,
			"roles": roles
		}
		updateProfile({id, patch: patchData})
	}

	const onChangeActive = ({ target: {value, checked} }) => {
		setIsActive(!checked)
	}

	const onChangeVerified = ({ target: {value, checked} }) => {
		setIsVerified(!checked)
	}

	const handleUpdatePassword = () => {
		updatePassword({
			id, data: {
				password,
				confirmPassword: repeatPassword
			}
		});
	}

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

	return (
		<div className='base-info-layout'>
			<>
			{
				isLoading  ? (
					
						<Spinner
							thickness='4px'
							speed='0.65s'
							emptyColor='gray.200'
							color='blue.500'
							size='xl'
						/>
				) : (
					<Grid
						gridTemplateRows={'repeat(1, ifr)'}
						gridTemplateColumns={'250px 250px 250px'}
						w='300px'
						h='550px'
						rowGap='1'
						gap='2'
						color='blackAlpha.700'
						fontWeight='bold'
					>
						<GridItem h='50px' colSpan={1} className='label'>
							Enter E-mail
						</GridItem>
						<GridItem h='50px' colSpan={2}>
							<TextField
								required
								h='50px'
								placeholder=" "
								id="outlined-controlled"
								value={email}
								onChange={(event) => {
									setEmail(event.target.value);
								}}
							/>
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

						<GridItem h='50px' colSpan={3}>
							<div className='password-control'>
								<Button
									isLoading={isCredentialsUpdating}
									isDisabled={(!password || !repeatPassword)|| error || validError}
									w='200px'
									h='50px'
									variant='outline'
									colorScheme='red'
									size='xl'
									onClick={handleModalOpen}
								>
									Password Update
								</Button>
							</div>
						</GridItem>
						<GridItem h='50px' colSpan={1} className='label'>
							Verified filters
						</GridItem>
						<GridItem h='50px' colSpan={1} className='verification-block'>
							<div className='checkbox'>
								<div>Active</div>
								<Checkbox
									value={isActive}
									isChecked={isActive}
									onChange={onChangeActive}
									disabled={false}
								/>
							</div>
						</GridItem>
						<GridItem h='50px' colSpan={1} className='verification-block'>
							<div className='checkbox'>
								<div>Verified</div>
								<Checkbox
									value={isVerified}
									isChecked={isVerified}
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
									rolesList?.map(({code, name}, index) => (
										<option key={index} value={code}>{name}</option>
									))
								}
							</Select>
						</GridItem>

						<GridItem h='50px' colSpan={3}>
							<div className='control'>
								<Button
									w='30%'
									h='50px'
									variant='outline'
									colorScheme='green'
									size='xl'
									onClick={handleUpdate}
								>
									Save and continue editing
								</Button>
							</div>
						</GridItem>
					</Grid>
				)
			}
			</>
			<Modal
				isOpen={isModalOpen}
				isCentered
				size='xl'
				onClose={() => handleModalClose()}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>
						<div className='modal-window-header'>
							<div>Are you sure to want change password ?</div>
						</div>
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<div>
							<ModalForm
								isLoading={isCredentialsUpdating}
								handleOperation={() => {
									handleUpdatePassword();
								}}
								onClose={() => {
									setPassword('');
									setRepeatPassword('');
									handleModalClose()
								}}
							/>
						</div>
					</ModalBody>
				</ModalContent>
			</Modal>
		</div>
	)
};

export { BaseData };
