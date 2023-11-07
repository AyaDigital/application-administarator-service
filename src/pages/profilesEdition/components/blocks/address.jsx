import React, { useState, useEffect } from 'react';
import {
	Input as TextField,
	Grid,
	GridItem,
	Spinner
} from '@chakra-ui/react';
import {
	AutoComplete,
	AutoCompleteInput,
	AutoCompleteItem,
	AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
import Map from '_components/map/map';
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import useGeoLocation from 'hooks/useGeoLocation/useGeoLocation';
import CloseIcon from 'images/Icons/closeIcon';
import '../../profilesEdition.scss';

const AddressData = ({
	practitionerId = null,
	onClose,
	setError
}) => {
	const [name, setName] = useState('');
	const {locations, latlng, setLatLng, setLocations} = useGeoLocation();
	const [currentlatlng, setCurrentLatLng] = useState();
	const [addressLine, setAddressLine] = useState('');
	const [currentProfileAddress, setCurrrentProfileAddress] = useState('');
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
							gridTemplateRows={'repeat(2, ifr)'}
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
							<GridItem h='50px' colSpan={2}>
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
							<GridItem h='50px' colSpan={3} className='label'>
								<Map
										className='current-map'
										zoom={8}
										center={{
											lat: currentlatlng?.lat,
											lng: currentlatlng?.lng,
										}}
										onClick={handleMapClick}
										//icon={}
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
						</Grid>
				)
			}
			</>
		</div>
	)
};

export { AddressData };
