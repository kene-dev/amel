import { createSlice } from '@reduxjs/toolkit';

interface adminProductSlice {
    isOpen: boolean;
}
const initialState: adminProductSlice = {
    isOpen: false
};

const adminProductSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        toggleForm: (state) => {
            state.isOpen = !state.isOpen;
        }
    }
});

export const { toggleForm } = adminProductSlice.actions;
export default adminProductSlice.reducer;
