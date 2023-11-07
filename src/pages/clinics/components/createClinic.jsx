import React, { useState, useEffect } from 'react';
import { Select } from '@chakra-ui/react';
import {
	AutoComplete,
	AutoCompleteInput,
	AutoCompleteItem,
	AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
import Map from '_components/map/map';
import ClinicsIcon from 'images/Icons/clinicsIcon';
import CloseIcon from 'images/Icons/closeIcon';
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import useGeoLocation from 'hooks/useGeoLocation/useGeoLocation';
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
	useCreateClinicMutation,
	useBindAddressMutation,
	useFetchOneClinicQuery,
	useFetchBindedAddressQuery,
	useUpdateClinicMutation
} from '_store';

import '../clinics.scss';

const HEALTHCARE_ORG_TYPE_CODE = "prov";

const CreateClinicForm = ({
	clinicId = null,
	onClose
}) => {
	const {locations, latlng, setLatLng, setLocations} = useGeoLocation();
	const [bindAddress, {isLoading: isBindAddressLoading, isSuccess: isBindAddressSuccess}] = useBindAddressMutation();
	const [updateClinic, {isLoading: isUpdateClinicLoading, isSuccess: isUpdateClinicSuccess}] = useUpdateClinicMutation();
	const [createClinic, { isLoading, isSuccess, data: newClinic }] = useCreateClinicMutation();
	const [skip, setSkip] = useState(true);

	const {isLoading: isOneClinicFetching, isSuccess: isOneClinicFetched, data: oneClinic} = useFetchOneClinicQuery(clinicId, {
		skip
	});
	const { isSuccess: isAddressFetched, data: bindedAddress } = useFetchBindedAddressQuery(clinicId, {
		skip
	});

	const [name, setName] = useState('');
	const [currentlatlng, setCurrentLatLng] = useState();
	const [description, setDescription] = useState('');
	const [isActive, setIsActive] = useState(false);
	const [addressLine, setAddressLine] = useState('');
	const [currentProfileAddress, setCurrrentProfileAddress] = useState('');
	const {
		placePredictions,
		getPlacePredictions,
	} = usePlacesService({
		apiKey: process.env.REACT_APP_GOOGLE,
	});

	useEffect(() => {
		setName(oneClinic?.nameOrg || '');
		setDescription(oneClinic?.description || '');
		setIsActive(oneClinic?.active || false);
		setAddressLine(bindedAddress?.address_line || '');
		setCurrrentProfileAddress(bindedAddress?.address_line)
		setCurrentLatLng({lat: bindedAddress?.lat, lng: bindedAddress?.long});
	}, [oneClinic, isOneClinicFetched, isAddressFetched])

	useEffect(() => {
		if (clinicId) {
			setSkip(false)
		}
	}, [clinicId])

	const handleMarkerClick = () => {
		window.open(`http://maps.google.com/?q=${currentProfileAddress}`, '_blank');
	};

	const handleMapClick = ({lat, lng}) => {
		setLatLng({lat, lng});
	}

	useEffect(() => {
		if (isSuccess) {
			if (newClinic?.id) {
				bindAddress({id: newClinic?.id, addressLine})
			}
		}
		if (isUpdateClinicSuccess) {
			if (clinicId) {
				bindAddress({id: clinicId, addressLine})
			}
		}
	}, [newClinic, isSuccess, addressLine, bindAddress, clinicId, isUpdateClinicSuccess]);

	useEffect(() => {
		if (isBindAddressSuccess) {
			onClose();
		}
	}, [isUpdateClinicSuccess, isBindAddressSuccess, onClose]);

	const getAddressList = () => {
		return (
			<div className='locations-menu'>
				<div
					className='close-icon'
					onClick={(event) => {
						event.stopPropagation();
						setLocations([]);
					}}
				>
					<CloseIcon />
				</div>
				{
					locations?.map((item, index) => {
						return <div key={index}>
							<a
								href='#'
								onClick={(event) => {
									event.stopPropagation();
									setAddressLine(item.formatted_address);
								}}>
								{item.formatted_address}
							</a>
						</div>;
					})
				}
			</div>
		)
	}

	return (
		<div className='clinics-form-layout'>
			<>
			{
				(isLoading || isBindAddressLoading || isOneClinicFetching || isUpdateClinicLoading) ? (
					
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
									<Select
											placeholder='Select option'
											h='50px'
											value={isActive}
											id="outlined-controlled"
											onChange={(event) => {
												setIsActive(event.target.value);
											}}
									>
										<option value='true'>true</option>
										<option value='false'>false</option>
									</Select>
									<FormLabel>Is active</FormLabel>
								</FormControl>
							</GridItem>

							<GridItem colSpan={2}>
							<FormControl variant="floating">
								<AutoComplete
									focusInputOnSelect
									placeholder='Select option'
									value={addressLine}
									onSelectOption={({item}) => {
										setAddressLine(item.value);
									}}
									openOnFocus
								>
									<AutoCompleteInput
										placeholder='Select state'
										height='50px'
										value={addressLine}
										onChange={(event) => {
											setAddressLine(event.target.value)
											getPlacePredictions({ input: event.target.value });
										}}
									/>
									<AutoCompleteList>
									{placePredictions.map((option, index) => (
										<AutoCompleteItem
											key={`option-${index}`}
											value={option.description}
											textTransform="capitalize"
										>
											{option.description}
										</AutoCompleteItem>
										))}
									</AutoCompleteList>
								</AutoComplete>
								<FormLabel>Address line</FormLabel>
							</FormControl>
							</GridItem>
							<GridItem colSpan={2}>
								<Map
									className='current-map'
									zoom={8}
									center={{
										lat: currentlatlng?.lat,
										lng: currentlatlng?.lng,
									}}
									onClick={handleMapClick}
									icon={
										<ClinicsIcon
											width = "28"
											height = "29"
											color={'red'}
										/>
									}
									markers={currentProfileAddress ? 
										[{
											lat: currentlatlng?.lat,
											lng: currentlatlng?.lng,
											text: name,
										}] : undefined}
									overlay={locations?.length ? {
											lat: latlng?.lat,
											lng: latlng?.lng,
											content: getAddressList(),
										} : undefined}

								/>
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
											nameOrg: name,
											description: description,
											active: isActive,
											codeType: HEALTHCARE_ORG_TYPE_CODE
										};
										if (clinicId) {
											updateClinic({id: clinicId, ...orgData})
										} else {
											createClinic(orgData);
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

export { CreateClinicForm };
