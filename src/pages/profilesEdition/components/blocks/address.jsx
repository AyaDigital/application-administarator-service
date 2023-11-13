import React, { useState, useEffect } from 'react';
import {
	Input as TextField,
	Button,
	Grid,
	GridItem,
	Spinner,
	Avatar
} from '@chakra-ui/react';
import {
	AutoComplete,
	AutoCompleteInput,
	AutoCompleteItem,
	AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
import Map from '_components/map/map';
import {
	useUpdateProfileAddressMutation,
	useGetProfileAddressQuery,
	useGetProfileAvatarByUuidQuery
} from '_store';
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import useGeoLocation from 'hooks/useGeoLocation/useGeolocationApi';
import CloseIcon from 'images/Icons/closeIcon';
import '../../profilesEdition.scss';

const AddressData = ({
	id = null,
}) => {
	const {locations, latlng, setLatLng, setLocations} = useGeoLocation();
	const [ updataProfileAddress, { isLoading: isAddressLoading, isSuccess: isAddressUpdated }] = useUpdateProfileAddressMutation();
	const { isSuccess, data: address = {} } = useGetProfileAddressQuery(id);
	const { isLoading: isAvatarLoading, isSuccess: isAvatarLoaded, data: avatarData = {} } = useGetProfileAvatarByUuidQuery(id);

	const [currentlatlng, setCurrentLatLng] = useState();
	const [addressLine, setAddressLine] = useState('');
	const [avatar, setAvatar] = useState('');
	const [currentProfileAddress, setCurrrentProfileAddress] = useState('');

	useEffect(() => {
		if (isAvatarLoaded) {
			setAvatar(avatarData.fullUrl);
		}
	}, [isAvatarLoaded, avatarData]);

	const {
		placePredictions,
		getPlacePredictions,
	} = usePlacesService({
		apiKey: process.env.REACT_APP_GOOGLE,
	});

	const isLoading = false;

	const handleMapClick = ({lat, lng}) => {
		setLatLng({lat, lng});
	}

	useEffect(() => {
		if (isSuccess) {
			setCurrentLatLng({lat: address.lat, lng: address.long})
			setAddressLine(address?.address_line);
			setCurrrentProfileAddress(address?.address_line);
		}
	}, [isSuccess, address]);

	useEffect(() => {
		if (isAddressUpdated) {
			setLocations([]);
		}
	}, [isAddressUpdated])

	const handleUpdate = () => {
		const patchData = {
			"address_line": addressLine
		}
		updataProfileAddress({id, data: patchData})
	}

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
									setAddressLine(item.formattedAddress);
								}}>
								{item.formattedAddress}
							</a>
						</div>;
					})
				}
			</div>
		)
	}

	return (
		<div className='schedule-layout'>
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
							gridTemplateRows={'repeat(3, 1fr)'}
							gridTemplateColumns={'250px 250px 250px'}
							w='300px'
							h='250px'
							rowGap='1'
							gap='2'
							color='blackAlpha.700'
							fontWeight='bold'
						>
							<GridItem h='50px' colSpan={1} className='label'>
								Enter Addrtess Line
							</GridItem>
							<GridItem colSpan={2}>
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
							</GridItem>
							<GridItem colSpan={3} className='label'>
								<Map
										className='current-map'
										zoom={8}
										center={{
											lat: currentlatlng?.lat,
											lng: currentlatlng?.lng,
										}}
										onClick={handleMapClick}			
										icon={
											<Avatar
												src={avatar}
												size='lg'
											/>
										}
										marker={currentProfileAddress ? 
											{
												lat: currentlatlng?.lat,
												lng: currentlatlng?.lng,
												text: '',
											} : undefined}
										overlay={locations?.length ? {
												lat: latlng?.lat,
												lng: latlng?.lng,
												content: getAddressList(),
											} : undefined}

									/>
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
		</div>
	)
};

export { AddressData };
