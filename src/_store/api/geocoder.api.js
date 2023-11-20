import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithToken from './helpers/customFetchBase';

const HEALTHAPP_URI = process.env.REACT_APP_BASE_URL;
const API_GEOCODE = '/maps/api/geocode/json';

export const geocoderApi = createApi({
	reducerPath: 'geocoderApi',
	baseQuery: baseQueryWithToken,
	endpoints: (builder) => ({
		geocodeByLocation: builder.query({
			query(latlng) {
				return {
				  url: HEALTHAPP_URI + API_GEOCODE + '?latlng=' + latlng,
				};
			  },
		}),
	}),
})

export const {
	useGeocodeByLocationQuery,
} = geocoderApi;
