import { createApi } from '@reduxjs/toolkit/query/react';

import baseQueryWithToken from './helpers/customFetchBase';

const ADMIN_URI = process.env.REACT_APP_BASE_ADMIN_URL
const HEALTHAPP_URI = process.env.REACT_APP_BASE_URL

const PRACTITIONERS = '/api/profiles';
const PROFILE = '/api/profile';
const AVATAR = '/avatar';
const UPLOAD = '/upload';
const ABOUT_INFO = '/about-info';
const PROFILES = '/api/profiles';
const SPECIALITIES = '/api/specialities';
const SPECIALITIES_ADD = SPECIALITIES + "/add";
const SPECIALITIES_DESTROY = SPECIALITIES + "/destroy";
const SHOW_SPECIALITIES = SPECIALITIES + '/show-specialities';

export const practitionersApi = createApi({
	reducerPath: 'practitionersApi',
	baseQuery: baseQueryWithToken,
	entityTypes: ["Practitioners", "Specialities"],
	endpoints: (build) => ({
		createPractitioner: build.mutation({
			query: (data) => ({
				url: ADMIN_URI + PROFILES,
				method: 'POST',
				body: data
			  }),
			invalidatesTags: ["Practitioner", "Practitioners"],
		}),
		updatePractitioner: build.mutation({
			query: ({ id, ...patch }) => ({
			  url: `${HEALTHAPP_URI}${PROFILE}/${id}`,
			  method: 'PATCH',
			  body: patch
			}),
			invalidatesTags: ["Practitioner", "Practitioners"],
		  }),
		updateAvatar: build.mutation({
			query: ({id, file}) => ({
					url: `${HEALTHAPP_URI}${PROFILE}/${id}${AVATAR}${UPLOAD}`,
					method: 'post',
					body: file
			}),
			invalidatesTags: (result) => ["Practitioner"],
		}),
		updateAboutInfo: build.mutation({
			query: ({id, about}) => ({
					url: `${HEALTHAPP_URI}${PROFILE}/${id}${ABOUT_INFO}`,
					method: 'patch',
					body: {aboutText: about}
			}),
			invalidatesTags: (result) => ["Practitioner"],
		}),
		getAboutInfo: build.query({
			query: (id) => {
				if (!id) {
					return null;
				}
				return {
						url: `${HEALTHAPP_URI}${PROFILE}/${id}${ABOUT_INFO}`,
						method: 'get',
				};
			},
			providesTags: (result) => ["Practitioner"],
		}),
		fetchOnePractitioner: build.query({
			query: (id) => `${ADMIN_URI}${PRACTITIONERS}/${id}`,
			providesTags: (result) => ["Practitioner"],
		}),
		addPractitionerSpecialities: build.mutation({
			query: ({id, data}) => {
				console.log('data', data)
				return {
				url: HEALTHAPP_URI + SPECIALITIES_ADD + '/' + id,
				method: 'post',
				body: { specIds: data }
			}},
			invalidatesTags: (result) => ["Specialities"]
		}),
		removePractitionerSpecialities: build.mutation({
			query: ({id, data}) => ({
				url: HEALTHAPP_URI + SPECIALITIES_DESTROY + '/' + id,
				method: 'delete',
				body: { specIds: data }
			}),
			invalidatesTags: (result) => ["Specialities"]
		}),
		fetchPractitionerSpecialities: build.query({
			query: (id) =>  HEALTHAPP_URI + SHOW_SPECIALITIES + '/' + id,
			providesTags: (result) => ["Specialities"]
		})
	}),
})

export const {
	useFetchOnePractitionerQuery,
	useUpdatePractitionerMutation,
	useCreatePractitionerMutation,
	useUpdateAvatarMutation,
	useUpdateAboutInfoMutation,
	useGetAboutInfoQuery,
	useAddPractitionerSpecialitiesMutation,
	useRemovePractitionerSpecialitiesMutation,
	useFetchPractitionerSpecialitiesQuery
} = practitionersApi;
