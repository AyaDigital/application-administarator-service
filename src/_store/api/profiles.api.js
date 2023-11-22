import { createApi } from '@reduxjs/toolkit/query/react';

import baseQueryWithToken from './helpers/customFetchBase';

const ADMIN_URI = process.env.REACT_APP_BASE_ADMIN_URL
const HEALTHAPP_URI = process.env.REACT_APP_BASE_URL

const AVATAR = '/avatar';
const UPLOAD_AVATAR_BY_UUID = '/api/profile/avatar/upload';
const DESTROY_AVATAR_BY_UUID = '/api/profile/avatar/destroy';
const GET_AVATAR_BY_UUID = '/api/profile/avatar';
const CREDENTIALS_UPDATE = '/api/profiles/credentials-update';
const UPLOAD = '/upload';
const ABOUT_INFO = '/api/profile/about-info';
const EDUCATION = '/api/education-train';
const PROFILES = '/api/profiles';
const PROFILES_ROLES = '/api/profiles/roles';
const PROFILE = '/api/profile';
const API_SETTING_ADDRESS = '/api/settings/address';
const REFRESH_USER_SPECIALITIES = '/api/specialities/refresh';
const REFRESH_PROFILE_LANGUAGES = '/api/settings/languages/refresh-by-uuid';
const REFRESH_PROFILE_DEGREES = '/api/settings/medical-degrees/refresh-by-uuid';
const PROFILE_INSURANCES = '/api/settings/insurances/profile-insurances-by-uuid';

export const profilesApi = createApi({
	reducerPath: 'profilesApi',
	baseQuery: baseQueryWithToken,
	entityTypes: ["Profile"],
	endpoints: (build) => ({
		createProfile: build.mutation({
			query: (data) => ({
				url: ADMIN_URI + PROFILES,
				method: 'POST',
				body: data
			  }),
			invalidatesTags: ["Profile"],
		}),
		updateProfile: build.mutation({
			query: ({ id, patch }) => ({
			  url: `${ADMIN_URI}${PROFILES}/${id}`,
			  method: 'PATCH',
			  body: patch
			}),
			invalidatesTags: ["Profile"],
		  }),
        getProfileById: build.query({
            query: (id) =>  ({
                url: ADMIN_URI + PROFILES + '/' + id,
                method: 'GET'
            }),
			providesTags: (result) => ["Profile"]
        }),
        fetchRoles: build.query({
            query: (id) =>  ({
                url: ADMIN_URI + PROFILES_ROLES,
                method: 'GET'
            })
        }),
		updateProfileAvatar: build.mutation({
			query: ({id, file}) => ({
				url: `${HEALTHAPP_URI}${PROFILE}/${id}${AVATAR}${UPLOAD}`,
				method: 'post',
				body: file
			}),
			invalidatesTags: (result) => ["Profile"],
		}),
		updateProfileAboutInfo: build.mutation({
			query: ({id, about}) => ({
				url: HEALTHAPP_URI + ABOUT_INFO + '/' + id,
				method: 'PATCH',
				body: {aboutText: about}
			}),
			invalidatesTags: (result) => ["About"],
		}),
		getProfileAboutInfo: build.query({
			query: (id) => {
				if (!id) {
					return null;
				}
				return {
					url: HEALTHAPP_URI + ABOUT_INFO + '/' + id,
					method: 'GET',
				};
			},
			providesTags: (result) => ["About"],
		}),
		updateProfileEducation: build.mutation({
			query: ({id, education}) => ({
				url: HEALTHAPP_URI + EDUCATION + '/' + id,
				method: 'PATCH',
				body: {description: education}
			}),
			invalidatesTags: (result) => ["Education"],
		}),
		getProfileEducation: build.query({
			query: (id) => {
				if (!id) {
					return null;
				}
				return {
					url: HEALTHAPP_URI + EDUCATION + '/' + id,
					method: 'GET',
				};
			},
			providesTags: (result) => ["Education"],
		}),
		uploadProfileAvatarByUuid: build.mutation({
			query: ({id, file}) => ({
				url: HEALTHAPP_URI + UPLOAD_AVATAR_BY_UUID + '/' + id,
				method: 'POST',
				body: file
			}),
			invalidatesTags: (result) => ["Avatar"],
		}),
		destroyProfileAvatarByUuid: build.mutation({
			query: (id) => ({
				url: HEALTHAPP_URI + DESTROY_AVATAR_BY_UUID + '/' + id,
				method: 'DELETE',
			}),
			invalidatesTags: (result) => ["Avatar"],
		}),
		getProfileAvatarByUuid: build.query({
			query: (id) => ({
				url: HEALTHAPP_URI + GET_AVATAR_BY_UUID + '/' + id,
				method: 'GET',
			}),
			providesTags: (result) => ["Avatar"],
		}),
		updateCredentials: build.mutation({
			query: ({id, data}) => ({
				url: ADMIN_URI + CREDENTIALS_UPDATE + '/' + id,
				method: 'PUT',
				body: data
			}),
		}),
		updateProfileAddress: build.mutation({
			query: ({id, data}) => ({
				url: HEALTHAPP_URI + API_SETTING_ADDRESS + '/' + id,
				method: 'PUT',
				body: data
			}),
			invalidatesTags: (result) => ["Address"],
		}),
		getProfileAddress: build.query({
			query: (id) => ({
				url: HEALTHAPP_URI + API_SETTING_ADDRESS + '/' + id,
				method: 'GET'
			}),
			providesTags: (result) => ["Address"],
		}),
		refreshUserSpecialities: build.mutation({
			query: ({id, data}) => ({
				url: HEALTHAPP_URI + REFRESH_USER_SPECIALITIES + '/' + id,
				method: 'PUT',
				body: data
			  }),
			invalidatesTags: ["Profile"],
		}),
		refreshUserLanguages: build.mutation({
			query: ({id, data}) => ({
				url: HEALTHAPP_URI + REFRESH_PROFILE_LANGUAGES + '/' + id,
				method: 'PUT',
				body: data
			  }),
			  invalidatesTags: ["Profile"],
		}),
		refreshUserDegrees: build.mutation({
			query: ({id, data}) => ({
				url: HEALTHAPP_URI + REFRESH_PROFILE_DEGREES + '/' + id,
				method: 'PUT',
				body: data
			  }),
			  invalidatesTags: ["Profile"],
		}),
		addUserInsurances: build.mutation({
			query: ({id, data}) => ({
				url: HEALTHAPP_URI + PROFILE_INSURANCES + '/' + id,
				method: 'POST',
				body: data
			  }),
			  invalidatesTags: ["Profile"],
		}),
		deleteUserInsurances: build.mutation({
			query: ({id, data}) => ({
				url: HEALTHAPP_URI + PROFILE_INSURANCES + '/' + id,
				method: 'DELETE',
				body: data
			  }),
			  invalidatesTags: ["Profile"],
		}),
	}),
})

export const {
	useCreateProfileMutation,
	useUpdateProfileMutation,
	useUpdateProfileEducationMutation,
	useGetProfileEducationQuery,
    useGetProfileByIdQuery,
    useFetchRolesQuery,
	useUpdateProfileAvatarMutation,
	useUpdateProfileAboutInfoMutation,
	useGetProfileAboutInfoQuery,
	useUploadProfileAvatarByUuidMutation,
	useDestroyProfileAvatarByUuidMutation,
	useGetProfileAvatarByUuidQuery,
	useUpdateCredentialsMutation,
	useUpdateProfileAddressMutation,
	useGetProfileAddressQuery,
	useRefreshUserSpecialitiesMutation,
	useRefreshUserDegreesMutation,
	useDeleteUserInsurancesMutation,
	useAddUserInsurancesMutation,
	useRefreshUserLanguagesMutation
} = profilesApi;
