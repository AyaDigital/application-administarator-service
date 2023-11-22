import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithToken from './helpers/customFetchBase';

const HEALTHAPP_URI = process.env.REACT_APP_BASE_URL

const SPECIALITIES = '/api/specialities';
const SEARCH_SPECIALITIES = '/search-app/specialities';
const REFRESH_USER_SPECIALITIES = '/api/specialities/refresh';
const GET_USRES_SPECIALITIES = '/api/specialities/show-specialities-by-uuid';

export const specialitiesApi = createApi({
	reducerPath: 'specialitiesApi',
	baseQuery: baseQueryWithToken,
	entityTypes: ["Specialities", "Speciality", "UserSpecialities", "UserSpeciality", "Practitioner"],
	endpoints: (builder) => ({
		fetchSpecialities: builder.query({
			query({scrollId, page, search}) {
				let tail = '?page=' + page;
				if (search) {
					tail = "?search=" + search + '&page=' + page;
				}
				if (scrollId) {
					tail = "?scrollId=" + scrollId + '&page=' + page;
				}
				return {
                    url: HEALTHAPP_URI + SEARCH_SPECIALITIES + tail,
				};
			  },
			providesTags: (result) => ["Specialities"],
		}),
		fetchSpecialitiesByPage: builder.query({
			query(page) {
				return {
                    url: HEALTHAPP_URI + SPECIALITIES + "?page=" + page,
				};
			  },
			  providesTags: (result) => ["Specialities"],
		}),
		fetchUserSpecialities: builder.query({
			query: (id) => ({
				url: HEALTHAPP_URI + GET_USRES_SPECIALITIES + '/' + id,
				method: 'GET',
			}),
			providesTags: ["UserSpecialities", "UserSpeciality"]
		}),
		createSpeciality: builder.mutation({
			query: (data) => ({
				url: HEALTHAPP_URI + SPECIALITIES,
				method: 'POST',
				body: data
			  }),
			invalidatesTags: ["Specialities", "Speciality"],
		}),
		updateSpeciality: builder.mutation({
			query: ({id, ...data}) => ({
				url: HEALTHAPP_URI + SPECIALITIES + '/' + id,
				method: 'PATCH',
				body: data
			  }),
			invalidatesTags: ["Specialities", "Speciality"],
		}),
		deleteSpeciality: builder.mutation({
			query: (id) => ({
				url: HEALTHAPP_URI + SPECIALITIES + "/" + id,
				method: 'DELETE',
			}),
			invalidatesTags: (result) => ["Specialities", "Speciality"],
		}),
	}),
})

export const {
	useFetchUserSpecialitiesQuery,
	useFetchSpecialitiesQuery,
	useFetchSpecialitiesByPageQuery,
	useCreateSpecialityMutation,
	useUpdateSpecialityMutation,
	useDeleteSpecialityMutation,
} = specialitiesApi;
