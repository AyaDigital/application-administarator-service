import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithToken from './helpers/customFetchBase';

const HEALTHAPP_URI = process.env.REACT_APP_BASE_URL
const SCHEDULES = '/api/schedules'
const ADMIN = '/admin'

export const schedulesApi = createApi({
	reducerPath: 'statesApi',
	baseQuery: baseQueryWithToken,
	entityTypes: ["Schedule"],
	endpoints: (builder) => ({
		createSchedule: builder.mutation({
			query(data) {
				return {
                    url: HEALTHAPP_URI + SCHEDULES + ADMIN,
					method: 'POST',
					body: data
				};
			  },
			  providesTags: (result) => ["Schedule"],
		}),
		deleteSchedule: builder.mutation({
			query(id) {
				return {
                    url: HEALTHAPP_URI +  SCHEDULES + "/" + id,
					method: 'DELETE'
				};
			  },
			  providesTags: (result) => ["Schedule"],
		}),
	}),
})

export const {
	useCreateScheduleMutation,
	useDeleteScheduleMutation,
} = schedulesApi;
