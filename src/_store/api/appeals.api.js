import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithToken from './helpers/customFetchBase';

const HEALTHAPP_URI = process.env.REACT_APP_BASE_URL

const APPEALS = '/api/appeals';

export const appealsApi = createApi({
	reducerPath: 'appealsApi',
	baseQuery: baseQueryWithToken,
	entityTypes: ["Appeals", "Appeal"],
	endpoints: (builder) => ({
		fetchAppeals: builder.query({
			query() {
				return {
                    url: HEALTHAPP_URI + APPEALS,
				};
			  },
			providesTags: (result) => ["Appeals"],
		}),
        createAppeal: builder.mutation({
			query: (data) => ({
				url: HEALTHAPP_URI + APPEALS,
				method: 'POST',
				body: data
			  }),
			invalidatesTags: ["Appeals"],
        }),
        editAppeal: builder.mutation({
			query: ({id, data}) => ({
				url: HEALTHAPP_URI + APPEALS + '/' + id,
				method: 'PATCH',
				body: data
			  }),
			invalidatesTags: ["Appeals"],
        }),
        deleteAppeal: builder.mutation({
			query: (id) => ({
				url: HEALTHAPP_URI + APPEALS + '/' + id,
				method: 'DELETE',
			  }),
			invalidatesTags: ["Appeals"],
        }),
	}),
})

export const {
	useFetchAppealsQuery,
	useCreateAppealMutation,
	useEditAppealMutation,
	useDeleteAppealMutation
} = appealsApi;
