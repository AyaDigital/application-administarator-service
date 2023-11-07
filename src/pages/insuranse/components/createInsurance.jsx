import React, { useState, useEffect } from 'react';
import { Select } from '@chakra-ui/react';
import {
	AutoComplete,
	AutoCompleteInput,
	AutoCompleteItem,
	AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
import Map from '_components/map/map';
import InsurancesIcon from 'images/Icons/clinicsIcon';
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
	useCreateInsuranceMutation,
	useBindAddressMutation,
	useFetchOneInsuranceQuery,
	useFetchBindedAddressQuery,
	useUpdateInsuranceMutation
} from '_store';

import '../insurance.scss';

const HEALTHCARE_ORG_TYPE_CODE = "ins";

const CreateInsuranceForm = ({
	companyId = null,
	onClose
}) => {
	const {locations, latlng, setLatLng, setLocations} = useGeoLocation();
	const [bindAddress, {isLoading: isBindAddressLoading, isSuccess: isBindAddressSuccess}] = useBindAddressMutation();
	const [updateInsurance, {isLoading: isUpdateInsuranceLoading, isSuccess: isUpdateInsuranceSuccess}] = useUpdateInsuranceMutation();
	const [createInsurance, { isLoading, isSuccess, data: newInsurance }] = useCreateInsuranceMutation();
	const [skip, setSkip] = useState(true);

	const {isLoading: isOneInsuranceFetching, isSuccess: isOneInsuranceFetched, data: oneInsurance} = useFetchOneInsuranceQuery(companyId, {
		skip
	});
	const { isSuccess: isAddressFetched, data: bindedAddress } = useFetchBindedAddressQuery(companyId, {
		skip
	});
	console.log('bindedAddress', bindedAddress)
	const [name, setName] = useState();
	const [currentlatlng, setCurrentLatLng] = useState();
	const [description, setDescription] = useState();
	const [isActive, setIsActive] = useState();
	const [addressLine, setAddressLine] = useState();
	const [currentProfileAddress, setCurrrentProfileAddress] = useState('');
	const {
		placePredictions,
		getPlacePredictions,
	} = usePlacesService({
		apiKey: process.env.REACT_APP_GOOGLE,
	});

	useEffect(() => {
		setName(oneInsurance?.nameOrg);
		setDescription(oneInsurance?.description);
		setIsActive(oneInsurance?.active);
		setAddressLine(bindedAddress?.address_line);
		setCurrrentProfileAddress(bindedAddress?.address_line)
		setCurrentLatLng({lat: bindedAddress?.lat, lng: bindedAddress?.long});
	}, [oneInsurance, isOneInsuranceFetched, isAddressFetched])

	useEffect(() => {
		if (companyId) {
			setSkip(false)
		}
	}, [companyId])

	const handleMarkerClick = () => {
		window.open(`http://maps.google.com/?q=${currentProfileAddress}`, '_blank');
	};

	const handleMapClick = ({lat, lng}) => {
		setLatLng({lat, lng});
	}

	useEffect(() => {
		if (isSuccess) {
			if (newInsurance?.id) {
				bindAddress({id: newInsurance?.id, addressLine})
			}
		}
		if (isUpdateInsuranceSuccess) {
			if (companyId) {
				bindAddress({id: companyId, addressLine})
			}
		}
	}, [newInsurance, isSuccess, addressLine, bindAddress, companyId, isUpdateInsuranceSuccess]);

	useEffect(() => {
		if (isBindAddressSuccess) {
			onClose();
		}
	}, [isUpdateInsuranceSuccess, isBindAddressSuccess, onClose]);

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
					locations?.map((item) => {
						return <div>
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
		<div className='insurances-form-layout'>
			<>
			{
				(isLoading || isBindAddressLoading || isOneInsuranceFetching || isUpdateInsuranceLoading) ? (
					
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
										<InsurancesIcon
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
										if (companyId) {
											updateInsurance({id: companyId, ...orgData})
										} else {
											createInsurance(orgData);
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

export { CreateInsuranceForm };
