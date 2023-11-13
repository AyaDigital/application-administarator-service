import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithToken from './helpers/customFetchBase';

const HEALTHAPP_URI = process.env.REACT_APP_BASE_URL

const CITIES = '/api/cities';
const COUNTRIES = '/api/countries';
const STATES = '/api/states';

export const geographyApi = createApi({
	reducerPath: 'geographyApi',
	baseQuery: baseQueryWithToken,
	entityTypes: ["Cities", "Countries", "States"],
	endpoints: (builder) => ({
		fetchCities: builder.query({
			query() {
				return {
				  url: HEALTHAPP_URI + CITIES,
				};
			  },
			providesTags: (result) => ["Cities"],
		}),
		fetchCountries: builder.query({
			query: (data) => ({
				url: HEALTHAPP_URI + COUNTRIES,
				method: 'GET'
			  }),
			providesTags: (result) => ["Countries"],
		}),
		fetchStates: builder.query({
			async queryFn(_arg, _queryApi, _extraOptions, fetch) {
				const result = await fetch(HEALTHAPP_URI + STATES);
                let limit = result.data.totalElements
                let states = await fetch(HEALTHAPP_URI + STATES + "?limit=" + limit);
				return states.data ? { data: states.data.content } : { error: states.error }
			  },
			  providesTags: (result) => ["States"],
		}),
		searchStates: builder.query({
			query: (search) => ({
				url: `${HEALTHAPP_URI}${STATES}?page=0&search=${search}`,
				method: 'GET'
			  }),
			providesTags: (result) => ["States"],
		}),
		searchCitiesByState: builder.query({
			async queryFn(_arg, _queryApi, _extraOptions, fetch) {
				const {searchName, stateId} = _arg;
				const url =  `${HEALTHAPP_URI}${CITIES}?page=0&nameCity=${searchName}&stateId=${stateId}`;
				const result = await fetch(url);
                let limit = result.data.totalElements
                let cities = await fetch(url + "&limit=" + limit);
				return cities.data ? { data: cities.data.content } : { error: cities.error }
			  },
			  providesTags: (result) => ["Cities"],
		}),
	}),
})

export const {
	// useFetchCitiesQuery,
	useFetchCountriesQuery,
	useFetchStatesQuery,
	useSearchStatesQuery,
	useSearchCitiesByStateQuery
} = geographyApi;
