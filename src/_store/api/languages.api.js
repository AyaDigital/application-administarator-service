import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithToken from './helpers/customFetchBase';

const HEALTHAPP_URI = process.env.REACT_APP_BASE_URL

const SEARCH_LANGUAGES = '/search-app/languages';
const SEARCH_LANGUAGES_LIST = '/api/settings/languages/list';
const CREATE_LANGUAGE = '/api/settings/languages/create-language';
const EDIT_LANGUAGE = '/api/settings/languages/edit-language';
const DELETE_LANGUAGE = '/api/settings/languages/destroy-language';

const SEARCH_PROFILE_LANGUAGES = '/api/settings/languages/list-admin';

export const languagesApi = createApi({
	reducerPath: 'languagesApi',
	baseQuery: baseQueryWithToken,
	entityTypes: ["Languages", "Language"],
	endpoints: (builder) => ({
		fetchLanguagesList: builder.query({
			query() {
				return {
                   url: HEALTHAPP_URI + SEARCH_LANGUAGES_LIST,
				   method: 'GET',
				};
			  },
			providesTags: (result) => ["Languages"],
		}),
		fetchLanguages: builder.query({
			query({scrollId, page, search}) {
				let tail = '?page=' + page;
				if (search) {
					tail = "?search=" + search + '&page=' + page;
				}
				if (scrollId) {
					tail = "?scrollId=" + scrollId + '&page=' + page;
				}
				return {
                    url: HEALTHAPP_URI + SEARCH_LANGUAGES + tail,
				};
			  },
			providesTags: (result) => ["Languages"],
		}),
        createLanguage: builder.mutation({
			query: (data) => ({
				url: HEALTHAPP_URI + CREATE_LANGUAGE,
				method: 'POST',
				body: data
			  }),
			invalidatesTags: ["Languages"],
        }),
        editLanguage: builder.mutation({
			query: ({id, data}) => ({
				url: HEALTHAPP_URI + EDIT_LANGUAGE + '/' + id,
				method: 'PATCH',
				body: data
			  }),
			invalidatesTags: ["Languages"],
        }),
        deleteLanguage: builder.mutation({
			query: (id) => ({
				url: HEALTHAPP_URI + DELETE_LANGUAGE + '/' + id,
				method: 'DELETE',
			  }),
			invalidatesTags: ["Languages"],
        }),
		fetchUserLanguages: builder.query({
			query: (id) => ({
				url: HEALTHAPP_URI + SEARCH_PROFILE_LANGUAGES + '/' + id,
				method: 'GET',
			}),
			providesTags: ["UserLanguages", "UserLanguage"]
		}),
	}),
})

export const {
	useFetchLanguagesQuery,
	useFetchLanguagesListQuery,
	useCreateLanguageMutation,
	useEditLanguageMutation,
	useDeleteLanguageMutation,
	useFetchUserLanguagesQuery
} = languagesApi;
