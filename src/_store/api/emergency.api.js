import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithToken from './helpers/customFetchBase';

const HEALTHAPP_URI = process.env.REACT_APP_BASE_URL

const EMERGENCIES = '/api/profile/emergency/v2/relations-types';
const SEARCH_EMERGENCIES_BY_SCROLL_TOKEN = '/search-app/api/emergency-types';

export const emergencyApi = createApi({
	reducerPath: 'emergencyApi',
	baseQuery: baseQueryWithToken,
	entityTypes: ["Emergency", "Emergencies"],
	endpoints: (builder) => ({
		fetchEmergencies: builder.query({
			query() {
				return {
                   url: HEALTHAPP_URI + EMERGENCIES,
				   method: 'GET',
				};
			  },
			providesTags: (result) => ["Emergencies"],
		}),
		fetchEmergenciesByScrollId: builder.query({
			query({scrollId, page, search}) {
				let tail = '?page=' + page;
				if (search) {
					tail = "?search=" + search + '&page=' + page;
				}
				if (scrollId) {
					tail = "?scrollId=" + scrollId + '&page=' + page;
				}
				return {
                    url: HEALTHAPP_URI + SEARCH_EMERGENCIES_BY_SCROLL_TOKEN + tail,
				};
			  },
			providesTags: (result) => ["Emergencies"],
		}),
		getEmergencyById: builder.query({
			query(id) {
				return {
                   url: HEALTHAPP_URI + EMERGENCIES + '/' + id,
				   method: 'GET',
				};
			  },
			providesTags: (result) => ["Emergency"],
		}),
		updateEmergency: builder.mutation({
			query({id, data}) {
				return {
                   url: HEALTHAPP_URI + EMERGENCIES + '/' + id,
				   method: 'PATCH',
				   body: data
				};
			  },
			invalidatesTags: (result) => ["Emergency", "Emergencies"],
		}),
		createEmergency: builder.mutation({
			query(data) {
				return {
                   url: HEALTHAPP_URI + EMERGENCIES,
				   method: 'POST',
				   body: data
				};
			  },
			invalidatesTags: (result) => ["Emergency", "Emergencies"],
		}),
		deleteEmergency: builder.mutation({
			query(id) {
				return {
                   url: HEALTHAPP_URI + EMERGENCIES + '/' + id,
				   method: 'DELETE',
				};
			  },
			invalidatesTags: (result) => ["Emergency", "Emergencies"],
		}),
	}),
})

export const {
    useFetchEmergenciesQuery,
	useFetchEmergenciesByScrollIdQuery,
	useGetEmergencyByIdQuery,
	useUpdateEmergencyMutation,
	useCreateEmergencyMutation,
	useDeleteEmergencyMutation,
} = emergencyApi;