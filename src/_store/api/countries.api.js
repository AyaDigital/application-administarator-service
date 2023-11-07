import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithToken from './helpers/customFetchBase';

const HEALTHAPP_URI = process.env.REACT_APP_BASE_URL

const COUNTRIES = '/api/countries'

export const countriesApi = createApi({
	reducerPath: 'countriesApi',
	baseQuery: baseQueryWithToken,
	entityTypes: ["Countries"],
	endpoints: (builder) => ({
		fetchCountries: builder.query({
			query() {
				return {
                    url: HEALTHAPP_URI + COUNTRIES + "?page=" + 0 + "&limit=200",
				};
			  },
			  providesTags: (result) => ["Countries"],
		}),
		fetchCountriesByPage: builder.query({
			query(page) {
				return {
                    url: HEALTHAPP_URI + COUNTRIES + "?page=" + page,
				};
			  },
			  providesTags: (result) => ["Countries"],
		}),
		createCountry: builder.mutation({
			query: (data) => ({
				url: HEALTHAPP_URI + COUNTRIES,
				method: 'POST',
				body: data
			  }),
			invalidatesTags: ["Countries", "Country"],
		}),
		updateCountry: builder.mutation({
			query: ({id, data}) => ({
				url: HEALTHAPP_URI + COUNTRIES,
				method: 'PATCH',
				body: data
			  }),
			invalidatesTags: ["Countries", "Country"],
		}),
		deleteCountry: builder.mutation({
			query: (id) => ({
				url: HEALTHAPP_URI + COUNTRIES + "/" + id,
				method: 'DELETE',
			}),
			invalidatesTags: (result) => ["Countries", "Country"],
		}),
	}),
})

export const {
	useFetchCountriesQuery,
	useFetchCountriesByPageQuery,
	useCreateCountryMutation,
	useUpdateCountryMutation,
	useDeleteCountryMutation,
} = countriesApi;
