import React, { useState, useEffect } from 'react';
import InputMask from "react-input-mask";
import upperfirst from 'lodash.upperfirst';
import dayjs, { Dayjs } from 'dayjs';
import {
	Avatar,
	Box,
	Button,
	Select,
	Input as TextField,
	FormControl,
	Textarea,
	FormLabel,
	Grid,
	GridItem,
	Spinner
} from '@chakra-ui/react';

import {
	useFetchOnePractitionerQuery,
	useUpdatePractitionerMutation,
	useUpdateAvatarMutation,
	useUpdateAboutInfoMutation,
	useGetAboutInfoQuery
} from '_store';

import '../practitioners.scss';

const sexes = ['Male', 'Female', 'Other'];

const EditPractitionerForm = ({
	practitionerId = null,
	onClose
}) => {
	const [ updateAvatar ] = useUpdateAvatarMutation();
	const [ updateAboutInfo ] = useUpdateAboutInfoMutation();
	const [ updatePractitioner] = useUpdatePractitionerMutation();
	const { isLoading, data: practitioner = {}} = useFetchOnePractitionerQuery(practitionerId);
	const [firstName, setFirstName] = useState(practitioner.firstName);
	const [lastName, setLastName] = useState(practitioner.lastName);
	const [middleName, setMiddleName] = useState(practitioner.middleName);
	const [birthDate, setBirthDate] = useState(dayjs(practitioner.birthDate));
	const [tin, setTin] = useState(practitioner.tin);
	const [sex, setSex] = useState(practitioner.sex);
	const [ssn, setSsn] = useState(practitioner.ssn);
	const [isEmailverified, setIsEmailVerified] = useState('yes')
	const [isActive, setIsActive] = useState('yes');
	const [about, setAbout] = useState('');
	const [file, setFile] = useState([]);
	const [fileObject, setFileObject] = useState([]);
	const [skip, setSkip] = useState(true);
	const [id, setId] = useState(practitioner.id);

	const { data: aboutInfo } = useGetAboutInfoQuery(id, {
		skip
	});

	const handleFileUpload = (e) => {
		setFileObject(e.target.files[0]);
		setFile(URL.createObjectURL(e.target.files[0]))
	}

	useEffect(() => {
		if (!isLoading && practitioner.id) {
			setId(practitioner.id)
			setFirstName(practitioner.firstName);
			setLastName(practitioner.lastName);
			setMiddleName(practitioner.middleName);
			setBirthDate(practitioner.birthDate);
			setSsn(practitioner.ssn);
			setTin(practitioner.tin);
			setSex(practitioner.sex);
			setAbout(aboutInfo?.aboutText);
		}
	}, [isLoading, practitioner, aboutInfo]);

	useEffect(() => {
		if (id !== 'undefined') {
			setSkip(false);
		}
	}, [id])

	return (
		<div className='practitioners-layout'>
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
							gridTemplateRows={'50px'}
							gridTemplateColumns={'100px 100px 100px 100px 100px 100px'}
							w='600px'
							h='600px'
							gap='1'
							color='blackAlpha.700'
							fontWeight='bold'
						>
							<GridItem colSpan={2}>
								<FormControl variant="floating">
									<TextField
										required
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

							<GridItem pl='3' colSpan={3}>
								<TextField
									disabled
									id="outlined-controlled"
									label="Phone"
									defaultValue={practitioner?.phone}
								/>
							</GridItem>
							<GridItem pl='3' colSpan={3}>
								<TextField
									disabled
									id="outlined-controlled"
									label="Email"
									defaultValue={practitioner?.email}
								/>
							</GridItem>

							<GridItem colSpan={2}>
								<TextField
									id="outlined-controlled"
									label="Birth Date"
									type='date'
									defaultValue={practitioner?.birthDate}
								/>
							</GridItem>
							<GridItem colSpan={2}>
								<InputMask
									mask="999-99-9999"
									value={ssn}
									onChange={(event) => {
										setSsn(event.target.value)
									}}
								>
									{(inputProps) => 
										<TextField
											//{...inputProps}
											disableUnderline
											//onChange={inputProps.onChange}
										/>}
								</InputMask>
							</GridItem>
							<GridItem colSpan={2}>
								<InputMask
									mask="999-99-9999"
									value={tin}
									onChange={(event) => {
										setSsn(event.target.value)
									}}
								>
									{(inputProps) => 
										<TextField
											//{...inputProps}
											disableUnderline
											//onChange={inputProps.onChange}
										/>}
								</InputMask>
							</GridItem>

							<GridItem colSpan={2}>
								<Select placeholder='Select sex'>
									{
										sexes.map(item => (
											<option value='option1'>{item}</option>
										))
									}
								</Select>
							</GridItem>
							<GridItem colSpan={2}>
								<Select placeholder='Email verified'>
									<option value='option1'>yes</option>
									<option value='option2'>no</option>
								</Select>
							</GridItem>
							<GridItem colSpan={2}>
								<Select placeholder='Is active'>
									<option value='option1'>yes</option>
									<option value='option2'>no</option>
								</Select>
							</GridItem>

							<GridItem colSpan={6}>
								<Textarea placeholder='' value={about} />
							</GridItem>

							<GridItem rowSpan={1} colSpan={3}>
								<div className="input-file-row">
									<label className="input-file">
										<input type="file" name="file[]" onChange={handleFileUpload} />		
										<span>Выберите файл</span>
									</label>
									<div className="input-file-list">
										<Avatar
											src={file}
											value={about}
											size='lg'
										/>
									</div>  
								</div> 
							</GridItem>

							<GridItem rowSpan={1} colSpan={3}>
								<Avatar
									src={practitioner.avatarUrl}
									alt={`${practitioner.firstName} ${practitioner.lastName}`}
									size='lg'
								/>
							</GridItem>

							<GridItem rowSpan={1} colSpan={3}>
								<Button
									w='200px'
									h='50px'
									variant='outline'
									colorScheme='teal'
									size='xl'
									onClick={onClose}
								>
									Close
								</Button>
							</GridItem>
							<GridItem rowSpan={1} colSpan={3}>
								<Button
									colorScheme='teal'
									variant='outline'
									w='200px'
									h='50px'
									size='xl'
									onClick={() => {
										if (fileObject.type) {
											const formData = new FormData();
											formData.append("file", fileObject);
											updateAvatar({id: practitioner.id, 'file': formData});
										}
										updatePractitioner({
											id: practitionerId, 
											middleName,
											firstName,
											lastName
										});
										updateAboutInfo({id: practitioner.id, about});
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

export { EditPractitionerForm };