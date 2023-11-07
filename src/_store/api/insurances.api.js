import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithToken from './helpers/customFetchBase';

const HEALTHAPP_URI = process.env.REACT_APP_BASE_URL;

const ORGANIZATIONS = '/api/organizations';
const WORK_ADDRESS = '/work-address';
const EMPLOYEES = '/employers'
const ADD_EMPLOYEES = '/add-employers'
const DESTROY_EMPLOYEES = '/destroy-employers';
const PROFILE_INSURANCES = '/api/settings/insurances/profile-insurances-by-uuid';
const SEARCH_INSURANCES = '/search-app/insurances';
const INSURANCES = '/api/insurances';

export const insuranceApi = createApi({
	reducerPath: 'insuranceApi',
	baseQuery: baseQueryWithToken,
	entityTypes: ["Insurances", "Insurance", "Address"],
	endpoints: (builder) => ({
		fetchInsurancesList: builder.query({
			query(page) {
				return {
				  url: HEALTHAPP_URI + INSURANCES + "?page=" + page
				};
			  },
			  providesTags: (result) => ["Insurances"],
		}),
		fetchInsurances: builder.query({
			query({scrollId, page, search}) {
				let tail = '?page=' + page;
				if (search) {
					tail = "?search=" + search + '&page=' + page;
				}
				if (scrollId) {
					tail = "?scrollId=" + scrollId + '&page=' + page;
				}
				return {
				  url: HEALTHAPP_URI + SEARCH_INSURANCES + tail,
				};
			  },
			  providesTags: (result) => ["Insurances"],
		}),
		fetchOneInsurance: builder.query({
			query(id) {
				return {
				  url: HEALTHAPP_URI + ORGANIZATIONS + '/' + id,
				};
			  },
			  providesTags: (result) => ["Insurance"],
		}),
		addUserInsurances: builder.mutation({
			query: ({id, data}) => ({
				url: HEALTHAPP_URI + PROFILE_INSURANCES + '/' + id,
				method: 'POST',
				body: data
			  }),
			invalidatesTags: ["UserInsurances", "UserInsurance"],
		}),
		deleteUserInsurances: builder.mutation({
			query: ({id, data}) => ({
				url: HEALTHAPP_URI + PROFILE_INSURANCES + '/' + id,
				method: 'DELETE',
				body: data
			  }),
			invalidatesTags: ["UserInsurances", "UserInsurance"],
		}),
		fetchUserInsurances: builder.query({
			query: (id) => ({
				url: HEALTHAPP_URI + PROFILE_INSURANCES + '/' + id,
				method: 'GET',
			}),
			providesTags: ["UserInsurances", "UserInsurance"]
		}),
		createInsurance: builder.mutation({
			query: (data) => ({
				url: HEALTHAPP_URI + ORGANIZATIONS,
				method: 'POST',
				body: data
			  }),
			invalidatesTags: ["Insurances", "Insurance"],
		}),
		updateInsurance: builder.mutation({
			query: ({id, ...data}) => ({
				url: HEALTHAPP_URI + ORGANIZATIONS + '/' + id,
				method: 'PATCH',
				body: data
			  }),
			invalidatesTags: ["Insurances", "Insurance", "Address"],
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
		fetchInsurancesPractitioners: builder.query({
			query: (id) => HEALTHAPP_URI + ORGANIZATIONS + "/" + id + EMPLOYEES,
			transformResponse: (response) => response.content,
			providesTags: (result) => ["Employyes"],
		}),
		addPractitionersToInsurance: builder.mutation({
			query: ({id, employeeIds}) => ({
				url: HEALTHAPP_URI + ORGANIZATIONS + ADD_EMPLOYEES + "/" + id,
				method: 'POST',
				body: employeeIds
			}),
			invalidatesTags: (result) => ["Employyes"],
		}),
		deletePractitionersFromInsurance: builder.mutation({
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
	useFetchInsurancesQuery,
	useFetchInsurancesListQuery,
	useFetchUserInsurancesQuery,
	useDeleteUserInsurancesMutation,
	useAddUserInsurancesMutation,
	useCreateInsuranceMutation,
	// useBindAddressMutation,
	useFetchOneInsuranceQuery,
	// useFetchBindedAddressQuery,
	useUpdateInsuranceMutation,
	useFetchInsurancesPractitionersQuery,
	useAddPractitionersToInsuranceMutation,
	useDeletePractitionersFromInsuranceMutation
} = insuranceApi;
