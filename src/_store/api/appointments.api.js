import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithToken from './helpers/customFetchBase';

const HEALTHAPP_URI = process.env.REACT_APP_BASE_URL;
const TELEHEALTH_URI = process.env.REACT_APP_BACKEND_URL;
const SETTINGS = '/settings/appointmentWindow';

export const appointmentsApi = createApi({
	reducerPath: 'appointmentsApi',
	baseQuery: baseQueryWithToken,
	entityTypes: ["AppointmentSettings"],
	endpoints: (builder) => ({
		fetchAppointmentSettings: builder.query({
			query() {
				return {
                    url: TELEHEALTH_URI + SETTINGS,
				};
			  },
			providesTags: (result) => ["AppointmentSettings"],
		}),
        patchAppointmentSettings: builder.mutation({
			query: (data) => ({
				url: TELEHEALTH_URI + SETTINGS,
				method: 'PATCH',
				body: data
			  }),
			invalidatesTags: ["AppointmentSettings"],
        }),
	}),
})

export const {
	useFetchAppointmentSettingsQuery,
	usePatchAppointmentSettingsMutation
} = appointmentsApi;
