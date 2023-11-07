import { fetchBaseQuery } from '@reduxjs/toolkit/query';

const baseQuery = fetchBaseQuery({
	baseUrl: '',
	prepareHeaders: (headers, { getState }) => {
			const token = getState().auth.token

			if (token) {
					headers.set('authorization', `Bearer ${token}`)
			}
	}
});

const baseQueryWithToken = async (args, api, extraOptions) => {
	let result = await baseQuery(args, api, extraOptions);

	return result;
};

export default baseQueryWithToken;
