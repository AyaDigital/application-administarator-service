import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithToken from './helpers/customFetchBase';

const HEALTHAPP_URI = process.env.REACT_APP_BASE_URL

const CITIES = '/api/cities'

export const citiesApi = createApi({
	reducerPath: 'citiesApi',
	baseQuery: baseQueryWithToken,
	entityTypes: ["Cities"],
	endpoints: (builder) => ({
		fetchCities: builder.query({
			query() {
				return {
                    url: HEALTHAPP_URI + CITIES + "?page=" + 0 + "&limit=200",
				};
			  },
			  providesTags: (result) => ["Cities"],
		}),
		fetchCitiesByPage: builder.query({
			query(page) {
				return {
                    url: HEALTHAPP_URI + CITIES + "?page=" + page,
				};
			  },
			  providesTags: (result) => ["Cities"],
		}),
		createCity: builder.mutation({
			query: (data) => ({
				url: HEALTHAPP_URI + CITIES,
				method: 'POST',
				body: data
			  }),
			invalidatesTags: ["Cities", "Citiy"],
		}),
		updateCity: builder.mutation({
			query: ({id, ...data}) => {
				console.log('citydata', data);
				return {
					url: HEALTHAPP_URI + CITIES + '/' + id,
					method: 'PATCH',
					body: data
				  }
			} ,
			invalidatesTags: ["Cities", "Citiy"],
		}),
		deleteCity: builder.mutation({
			query: (id) => ({
				url: HEALTHAPP_URI + CITIES + "/" + id,
				method: 'DELETE',
			}),
			invalidatesTags: (result) => ["Cities", "City"],
		}),
	}),
})

export const {
	useFetchCitiesQuery,
	useFetchCitiesByPageQuery,
	useCreateCityMutation,
	useUpdateCityMutation,
	useDeleteCityMutation,
} = citiesApi;
