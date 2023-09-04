import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    depots: null,
    loading: false,
    error: null,
}

export const depotSlice = createSlice({
    name: 'depots',
    initialState,
    reducers: {
        fetchDepotsStart: (state) => {
            state.loading = true;
            state.error = false;
        },
        fetchDepotsSuccess: (state, action) => {
            state.loading = false;
            state.depots = action.payload;
            state.error = false;
        },
        fetchDepotsFailure: (state) => {
            state.loading = false;
            state.error = true;
        },
    }
})

export const {
    fetchDepotsStart,
    fetchDepotsSuccess,
    fetchDepotsFailure,
} = depotSlice.actions;

export default depotSlice.reducer;