import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithToken from './helpers/customFetchBase';

const HEALTHAPP_URI = process.env.REACT_APP_BASE_URL

const SEARCH_MEDICAL_DEGREES = '/search-app/medical-degrees';
const SEARCH_PROFILE_DEGREES = '/api/settings/medical-degrees/list-profile-by-uuid';
const REFRESH_PROFILE_DEGREES = '/api/settings/medical-degrees/refresh-by-uuid';
const CREATE_DEGREE = '/api/settings/medical-degrees/create';
const EDIT_DEGREE = '/api/settings/medical-degrees/edit';
const DESTROY_DEGREE = '/api/settings/medical-degrees/destroy';
const MEDICAL_DEGREES = '/api/settings/medical-degrees';

export const degreesApi = createApi({
	reducerPath: 'degreesApi',
	baseQuery: baseQueryWithToken,
	entityTypes: ["Degrees", "Degree"],
	endpoints: (builder) => ({
		fetchMedicalDegrees: builder.query({
			query({scrollId, page, search}) {
				let tail = '?page=' + page;
				if (search) {
					tail = "?search=" + search + '&page=' + page;
				}
				if (scrollId) {
					tail = "?scrollId=" + scrollId + '&page=' + page;
				}
				return {
                    url: HEALTHAPP_URI + SEARCH_MEDICAL_DEGREES + tail,
				};
			  },
			providesTags: (result) => ["Degrees"],
		}),
		fetchMedicalDegreesByPage: builder.query({
			query(page) {
				return {
                    url: HEALTHAPP_URI + MEDICAL_DEGREES + '?page=' + page,
				};
			  },
			providesTags: (result) => ["Degrees"],
		}),
		getMedicalDegreeById: builder.query({
			query(id) {
				return {
                   url: HEALTHAPP_URI + MEDICAL_DEGREES + '/' + id,
				   method: 'GET',
				};
			  },
			providesTags: (result) => ["Degree"],
		}),
		createMedicalDegree: builder.mutation({
			query: (data) => ({
				url: HEALTHAPP_URI + CREATE_DEGREE,
				method: 'POST',
				body: data
			}),
			invalidatesTags: ["Degrees"],
		}),
		editMedicalDegree: builder.mutation({
			query: ({id, data}) => ({
				url: HEALTHAPP_URI + EDIT_DEGREE + '/' + id,
				method: 'PATCH',
				body: data
			}),
			invalidatesTags: ["Degrees"],
		}),
		destroyMedicalDegree: builder.mutation({
			query: (id) => ({
				url: HEALTHAPP_URI + DESTROY_DEGREE + '/' + id,
				method: 'DELETE',
			}),
			invalidatesTags: ["Degrees"],
		}),
		fetchUserDegrees: builder.query({
			query: (id) => ({
				url: HEALTHAPP_URI + SEARCH_PROFILE_DEGREES + '/' + id,
				method: 'GET',
			}),
			providesTags: ["UserDegrees", "UserDegree"]
		}),
		refreshUserDegrees: builder.mutation({
			query: ({id, data}) => ({
				url: HEALTHAPP_URI + REFRESH_PROFILE_DEGREES + '/' + id,
				method: 'PUT',
				body: data
			  }),
			invalidatesTags: ["UserDegrees", "UserDegree"],
		}),
	}),
})

export const {
	useFetchMedicalDegreesQuery,
	useFetchMedicalDegreesByPageQuery,
	useFetchUserDegreesQuery,
	useRefreshUserDegreesMutation,
	useCreateMedicalDegreeMutation,
	useDestroyMedicalDegreeMutation,
	useEditMedicalDegreeMutation,
	useGetMedicalDegreeByIdQuery
} = degreesApi;
