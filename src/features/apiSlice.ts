import { createApi, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { RootState } from '../app/store';
import { logOut, updateToken } from './auth/authSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://tulipexpress-amel-susan.azurewebsites.net/api/v1',
  prepareHeaders: (headers, { getState, endpoint}) => {
    const state = getState() as RootState;
    const token = state.auth.access_token;

    const publicEndpoints = ['products'];

    if (token && !publicEndpoints.includes(endpoint)) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && (result.error as FetchBaseQueryError).status === 401) {
    const state = api.getState() as RootState;
    const refreshToken = state.auth.refresh_token;

    if (!refreshToken) {
      api.dispatch(logOut());
      console.log(result)
      return result;
    }

    const refreshResult = await baseQuery(
      {
        url: '/auth/refresh-token',
        method: 'POST',
        body: { refreshToken },
      },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      const { access_token } = refreshResult.data as {
        access_token: string;
      };

      console.log('access token updated' + access_token)
      api.dispatch(updateToken({ access_token: access_token,}));

      // Retry the original request with the new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }

  return result;
};

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery : baseQueryWithReauth,
      tagTypes: ["Products"],
    endpoints: (builder) => ({}),
  });