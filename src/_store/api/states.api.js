import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithToken from './helpers/customFetchBase';

const HEALTHAPP_URI = process.env.REACT_APP_BASE_URL

const STATES = '/api/states'

export const statesApi = createApi({
	reducerPath: 'statesApi',
	baseQuery: baseQueryWithToken,
	entityTypes: ["States"],
	endpoints: (builder) => ({
		fetchStates: builder.query({
			query() {
				return {
                    url: HEALTHAPP_URI + STATES + "?page=" + 0 + "&limit=200",
				};
			  },
			  providesTags: (result) => ["States"],
		}),
		fetchStatesByPage: builder.query({
			query(page) {
				return {
                    url: HEALTHAPP_URI + STATES + "?page=" + page,
				};
			  },
			  providesTags: (result) => ["States"],
		}),
		createState: builder.mutation({
			query: (data) => ({
				url: HEALTHAPP_URI + STATES,
				method: 'POST',
				body: data
			  }),
			invalidatesTags: ["States", "State"],
		}),
		updateState: builder.mutation({
			query: ({id, data}) => ({
				url: HEALTHAPP_URI + STATES,
				method: 'PATCH',
				body: data
			  }),
			invalidatesTags: ["States", "State"],
		}),
		deleteState: builder.mutation({
			query: (id) => ({
				url: HEALTHAPP_URI + STATES + "/" + id,
				method: 'DELETE',
			}),
			invalidatesTags: (result) => ["States", "State"],
		}),
	}),
})

export const {
	useFetchStatesQuery,
	useFetchStatesByPageQuery,
	useCreateStateMutation,
	useUpdateStateMutation,
	useDeleteStatesMutation,
} = statesApi;
