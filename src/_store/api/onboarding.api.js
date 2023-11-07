import { createApi } from '@reduxjs/toolkit/query/react';

import baseQueryWithToken from './helpers/customFetchBase';

const PAGES = '/api/pages';

export const onboardingApi = createApi({
	reducerPath: 'onboardingApi',
	baseQuery: baseQueryWithToken,
	endpoints: (builder) => ({
		fetchOnboardingPages: builder.query({
			query() {
				return {
				  url: PAGES,
				};
			  },
		}),
	}),
})

export const { useFetchOnboardingPagesQuery } = onboardingApi;