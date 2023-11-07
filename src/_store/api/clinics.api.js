import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithToken from './helpers/customFetchBase';

const HEALTHAPP_URI = process.env.REACT_APP_BASE_URL

const CLINICS = '/api/clinics/all';
const ORGANIZATIONS = '/api/organizations';
const WORK_ADDRESS = '/work-address';
const EMPLOYEES = '/employers'
const ADD_EMPLOYEES = '/add-employers'
const DESTROY_EMPLOYEES = '/destroy-employers';

export const clinicsApi = createApi({
	reducerPath: 'clinicsApi',
	baseQuery: baseQueryWithToken,
	entityTypes: ["Clinics", "Clinic", "Address"],
	endpoints: (builder) => ({
		fetchClinics: builder.query({
			query(page) {
				return {
				  url: HEALTHAPP_URI + CLINICS  + "?page=" + page,
				};
			  },
			  providesTags: (result) => ["Clinics"],
		}),
		fetchOneClinic: builder.query({
			query(id) {
				return {
				  url: HEALTHAPP_URI + ORGANIZATIONS + '/' + id,
				};
			  },
			  providesTags: (result) => ["Clinic"],
		}),
		createClinic: builder.mutation({
			query: (data) => ({
				url: HEALTHAPP_URI + ORGANIZATIONS,
				method: 'POST',
				body: data
			  }),
			invalidatesTags: ["Clinics", "Clinic"],
		}),
		updateClinic: builder.mutation({
			query: ({id, ...data}) => ({
				url: HEALTHAPP_URI + ORGANIZATIONS + '/' + id,
				method: 'PATCH',
				body: data
			  }),
			invalidatesTags: ["Clinics", "Clinic", "Address"],
		}),
		fetchBindedAddress: builder.query({
			query(id) {
				return {
				  url: HEALTHAPP_URI + ORGANIZATIONS + '/' + id + WORK_ADDRESS,
				};
			  },
			  providesTags: (result) => ["Address"],
		}),
		bindAddress: builder.mutation({
			query: ({id, addressLine}) => ({
				url: HEALTHAPP_URI + ORGANIZATIONS + "/" + id + WORK_ADDRESS,
				method: 'PUT',
				body: {
					"address_line": addressLine
				}
			}),
			invalidatesTags: (result) => ["Address"],
		}),
		fetchClinicsPractitioners: builder.query({
			query: (id) => HEALTHAPP_URI + ORGANIZATIONS + "/" + id + EMPLOYEES,
			transformResponse: (response) => response.content,
			providesTags: (result) => ["Employyes"],
		}),
		addPractitionersToClinic: builder.mutation({
			query: ({id, employeeIds}) => ({
				url: HEALTHAPP_URI + ORGANIZATIONS + ADD_EMPLOYEES + "/" + id,
				method: 'POST',
				body: employeeIds
			}),
			invalidatesTags: (result) => ["Employyes"],
		}),
		deletePractitionersFromClinic: builder.mutation({
			query: ({id, employeeIds}) => ({
				url: HEALTHAPP_URI + ORGANIZATIONS + DESTROY_EMPLOYEES + "/" + id,
				method: 'DELETE',
				body: employeeIds
			}),
			invalidatesTags: (result) => ["Employyes"],
		}),
	}),
})

export const {
	useFetchClinicsQuery,
	useCreateClinicMutation,
	useBindAddressMutation,
	useFetchOneClinicQuery,
	useFetchBindedAddressQuery,
	useUpdateClinicMutation,
	useFetchClinicsPractitionersQuery,
	useAddPractitionersToClinicMutation,
	useDeletePractitionersFromClinicMutation
} = clinicsApi;
