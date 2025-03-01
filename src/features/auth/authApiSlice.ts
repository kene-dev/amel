import { User } from "../../utils/types";
import { apiSlice } from "../apiSlice";
import { setCredentials } from "./authSlice";

const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        loginUser: builder.mutation<{ access_token: string; refresh_token: string }, { email: string; password: string }>({
            query: (data) => ({
              url: '/auth/login',
              method: 'POST',
              body: { ...data },
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
              try {
                const { data } = await queryFulfilled;
                // Store tokens in Redux on successful login
                dispatch(setCredentials({ access_token: data.access_token, refresh_token: data.refresh_token }));
              } catch (err) {
                console.error('Login failed:', err);
              }
            },
          }),

          registeUser: builder.mutation({
            query:(data) => ({
              url: '/auth/register',
              method:'POST',
              body: {...data}
            })
          }),

        getSingleUser: builder.query<User, void>({
          query: () => '/auth/user'
        }),

        updateUser: builder.mutation({
          query:(data) => ({
            url: '/auth/update-user',
            method:'PATCH',
            body: {...data}
          })
        }),
    })
})

export const {useLoginUserMutation, useRegisteUserMutation, useGetSingleUserQuery, useUpdateUserMutation} = authApiSlice;
export default authApiSlice.reducer;