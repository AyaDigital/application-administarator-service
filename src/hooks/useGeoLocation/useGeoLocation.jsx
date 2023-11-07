import { useState, useEffect } from 'react';
import { setDefaults, fromLatLng, OutputFormat, fromAddress } from "react-geocode";

export default function useGeoLocation() {
  const [locations, setLocations] = useState();
  const [latlng, setCurrentLatLng] = useState();
  const [currentlatlng, setCurrentAddressLatLng] = useState();

  useEffect(() => {
	setDefaults({
		key: process.env.REACT_APP_GOOGLE,
		language: "en",
		region: "es",
		outputFormat: OutputFormat.JSON
	});

	return () => {
		setLocations([])
	};
  }, []);

  const setLatLng = ({lat, lng}) => {
	fromLatLng(lat, lng)
		.then(({ results }) => {
			setCurrentLatLng({lat, lng})
			setLocations(results)
		})
		.catch(console.error);
  }
  const setCurrentAddressPoint = (address) => {
	fromAddress(address)
		.then(({ results }) => {
		const { lat, lng } = results[0].geometry.location;
		setCurrentAddressLatLng({lat, lng});
	})
	.catch(console.error);
  }
  return {locations, latlng, setLatLng, setLocations, setCurrentAddressPoint, currentlatlng};
}
