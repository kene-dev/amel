import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
    access_token: string | null,
    refresh_token: string | null,
}

const initialState: InitialState = {
    access_token: '',
    refresh_token: ''
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action:PayloadAction<InitialState>) => {
            state.access_token = action.payload.access_token
            state.refresh_token = action.payload.refresh_token
        },

        updateToken: (state, action:PayloadAction<{access_token: string}>) => {
            state.access_token = action.payload.access_token
        },

        logOut:(state) => {
            state.access_token = null
            state.refresh_token = null
        }
    }
})

export const {setCredentials, logOut, updateToken} = authSlice.actions;
export default authSlice.reducer