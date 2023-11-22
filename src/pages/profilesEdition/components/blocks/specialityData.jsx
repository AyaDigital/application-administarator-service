import React, { useState, useEffect } from 'react';

import {
	Avatar,
	Button,
	Textarea,
	Grid,
	GridItem,
	Spinner,
} from '@chakra-ui/react';

import {
	useRefreshUserSpecialitiesMutation,
	useDeleteUserInsurancesMutation,
	useAddUserInsurancesMutation,
	useRefreshUserLanguagesMutation,
	useRefreshUserDegreesMutation,
	useUpdateProfileAboutInfoMutation,
	useGetProfileAboutInfoQuery,
	useUpdateProfileEducationMutation,
	useGetProfileEducationQuery,
	useUploadProfileAvatarByUuidMutation,
	useDestroyProfileAvatarByUuidMutation,
	useGetProfileAvatarByUuidQuery
} from '_store';

import { DeleteIcon } from '@chakra-ui/icons';

import { SpecialitiesLoader } from './dictionaryLoaders/specialities';
import { InsurancesLoader } from './dictionaryLoaders/insurances';
import { DegreesLoader } from './dictionaryLoaders/degrees';
import { LanguagesLoader } from './dictionaryLoaders/languages';

import '../../profilesEdition.scss';

const SpecialityData = ({
	id = null,
	userSpecialities = [],
	usersInsurances = [],
	usersLanguages = [],
	usersDegrees = []
}) => {
	const isLoading = false;
	const [file, setFile] = useState([]);
	const [avatar, setAvatar] = useState('');
	const [education, setEducation] = useState();
	const [bio, setBio] = useState();
	const [fileObject, setFileObject] = useState([]);

	const { isLoading: isAvatarLoading, isSuccess: isAvatarLoaded, data: avatarData = {} } = useGetProfileAvatarByUuidQuery(id);

	const [ updateAvatar, { isLoading: isAvatarUpdating }] = useUploadProfileAvatarByUuidMutation();
	const [ updateAbout ] = useUpdateProfileAboutInfoMutation();
	const [ updateEducation ] = useUpdateProfileEducationMutation();
	const [ destroyAvatar, { isLoading: isAvatarDestroying } ] = useDestroyProfileAvatarByUuidMutation();

	const { data: aboutInfo } = useGetProfileAboutInfoQuery(id);
	const { data: educationData } = useGetProfileEducationQuery(id);

	const [refreshSpecialities] = useRefreshUserSpecialitiesMutation();
	const [refreshLanguages] = useRefreshUserLanguagesMutation();
	const [refreshDegrees] = useRefreshUserDegreesMutation();

	const [ deleteInsurance] = useDeleteUserInsurancesMutation();
	const [ addInsurance, { isSuccess: isInsuranceAdded }] = useAddUserInsurancesMutation();

	useEffect(() => {
		// setIsInsuransesListOpen(false);
		// setSearchInsurance('');
	}, [isInsuranceAdded])

	useEffect(() => {
		if (aboutInfo?.aboutText) {
			setBio(aboutInfo?.aboutText);
		}
	}, [aboutInfo]);

	useEffect(() => {
		if (educationData) {
			setEducation(educationData?.description);
		}
	}, [educationData]);

	useEffect(() => {
		if (isAvatarLoaded) {
			setAvatar(avatarData.fullUrl);
		}
	}, [isAvatarLoaded, avatarData])

	const handleRemoveSpeciality = (specialityId) => {
		const newArray = userSpecialities.filter(item => item.id !== specialityId)
			.map(speciality => speciality.id);
		refreshSpecialities({id, data: newArray});
	}

	const handleRemoveInsurances = (insuranceId) => {
		deleteInsurance({id, data: [insuranceId]});
	}

	const handleRemoveDegree = (degreeId) => {
		const newArrayDegree = usersDegrees.filter(item => item.id !== degreeId)
			.map(degree => degree.id);
		refreshDegrees({id, data: newArrayDegree});
	}

	const handleRemoveLanguage = (languageId) => {
		const newArray = usersLanguages.filter(item => item.id !== languageId)
			.map(language => language.id);
		refreshLanguages({id, data: newArray});
	}

	const handleAddInsurance = (insuranceId) => {
		addInsurance({id, data: [insuranceId]})
	}

	const handleAddSpeciality = (specialityId) => {
		const newArray = userSpecialities.map(speciality => speciality.id);
		newArray.push(specialityId);
		refreshSpecialities({id, data: newArray});
	}

	const handleAddLanguage = (languageId) => {
		const newArray = usersLanguages.map(language => language.id);
		newArray.push(languageId);
		refreshLanguages({id, data: newArray});
	}

	const handleAddDegree = (degreeId) => {
		const newArray = usersDegrees.map(degree => degree.id);
		newArray.push(degreeId);
		refreshDegrees({id, data: newArray});
	}

	const handleFileUpload = (e) => {
		const fileObject = e.target.files[0]
		if (fileObject.type) {
			const formData = new FormData();
			formData.append("file", fileObject);
			updateAvatar({id, 'file': formData});
		}
	}

	const handleDeleteAvatar = () => {
		destroyAvatar(id);
	}

	const handleSaveData = () => {
		updateAbout({id, about: bio});
		if (education !== educationData?.description) {
			updateEducation({id, education})
		}
	}

	return (
		<div className='speciality-layout'>
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
						<GridItem h='auto' colSpan={1} className='label'>
							{
								isAvatarUpdating || isAvatarDestroying || isAvatarLoading ? (
									<Spinner />
								) : (
									<Avatar
										src={avatar}
										// value={about}
										size='lg'
									/>
								)
							}
						</GridItem>
						<GridItem h='auto' colSpan={2}>
							<div className="input-file-row">
								<label className="input-file">
									<input type="file" name="file[]" onChange={handleFileUpload} />		
									<span>Выберите файл</span>
								</label>

								<Button
									onClick={handleDeleteAvatar}
								>
									<DeleteIcon/>
								</Button>
							</div> 
						</GridItem>
						<GridItem h='auto' colSpan={1} className='label'>
							Edit education and training
						</GridItem>
						<GridItem h='auto' colSpan={2}>
							<Textarea
								placeholder=''
								value={education}
								onChange={(event) => {
									setEducation(event.target.value)
								}}
							/>
						</GridItem>
						<GridItem h='auto' colSpan={1} className='label'>
							Edit bio
						</GridItem>
						<GridItem h='auto' colSpan={2}>
							<Textarea
								sx={{
									height: '200px'
								}}
								placeholder=''
								value={bio}
								onChange={(event) => {
									setBio(event.target.value)
								}}
							/>
						</GridItem>
						{
							(usersInsurances !== null && usersInsurances.length) ? (
								<GridItem h='auto' p={'10px'} colSpan={3}>
									<div className='items-cloud'>
										{
											usersInsurances.map((item) => {
												return (
													<Button
														colorScheme='pink'
														disableRipple={true}
														onClick={() => handleRemoveInsurances(item.id)}
													>
														{item.name}
													</Button>
													)
											})
										}
									</div>
								</GridItem>
							) : <GridItem h='0px' colSpan={3} />
						}
						<GridItem h='50px' colSpan={1} className='label'>
							Enter Insurances
						</GridItem>
						<GridItem h='50px' colSpan={2}>

							<InsurancesLoader
								handleAddInsurance={handleAddInsurance}
							/>

						</GridItem>
						{
							(userSpecialities !== null && userSpecialities.length) ? (
								<GridItem h='auto' p={'10px'} colSpan={3}>
									<div className='items-cloud'>
										{
											userSpecialities.map((item) => {
												return (
													<Button
														colorScheme='yellow'
														disableRipple={true}
														onClick={() => handleRemoveSpeciality(item.id)}
													>
														{item.name}
													</Button>
													)
											})
										}
									</div>
								</GridItem>
							) : <GridItem h='0px' colSpan={3} />
						}
						<GridItem h='50px' colSpan={1} className='label'>
							Enter Specialities
						</GridItem>
						<GridItem h='50px' colSpan={2}>

							<SpecialitiesLoader
								handleAddSpeciality={handleAddSpeciality}
							/>

						</GridItem>
						{
							(usersDegrees !== null && usersDegrees.length) ? (
								<GridItem h='auto' p={'10px'} colSpan={3}>
									<div className='items-cloud'>
										{
											usersDegrees.map((item) => {
												return (
													<Button
														colorScheme='pink'
														disableRipple={true}
														onClick={() => handleRemoveDegree(item.id)}
													>
														{item.name}
													</Button>
													)
											})
										}
									</div>
								</GridItem>
							) : <GridItem h='0px' colSpan={3} />
						}
						<GridItem h='50px' colSpan={1} className='label'>
							Enter Medical Degrees
						</GridItem>
						<GridItem h='50px' colSpan={2}>
							<DegreesLoader handleAddDegree={handleAddDegree} />
						</GridItem>
						{
							(usersLanguages !== null && usersLanguages.length) ? (
								<GridItem h='auto' p={'10px'} colSpan={3}>
									<div className='items-cloud'>
										{
											usersLanguages.map((item) => {
												return (
													<Button
														colorScheme='pink'
														disableRipple={true}
														onClick={() => handleRemoveLanguage(item.id)}
													>
														{item.name}
													</Button>
													)
											})
										}
									</div>
								</GridItem>
							) : <GridItem h='0px' colSpan={3} />
						}
						<GridItem h='50px' colSpan={1} className='label'>
							Enter Languages
						</GridItem>
						<GridItem h='50px' colSpan={2}>
							<LanguagesLoader handleAddLanguage={handleAddLanguage} />
						</GridItem>
						
						<GridItem h='50px' colSpan={3}>
							<div className='control'>
								<Button
									w='30%'
									h='50px'
									variant='outline'
									colorScheme='green'
									size='xl'
									onClick={handleSaveData}
								>
									Save and continue editing
								</Button>
							</div>
						</GridItem>
					</Grid>
				)
			}
			</>
		</div>
	)
};

export { SpecialityData };
