import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    warehouses: null,
    loading: false,
    error: null,
}

export const warehouseSlice = createSlice({
    name: 'warehouses',
    initialState,
    reducers: {
        fetchWarehouseStart: (state) => {
            state.loading = true;
            state.error = false;
        },
        fetchWarehouseSuccess: (state, action) => {
            state.loading = false;
            state.warehouses = action.payload;
            state.error = false;
        },
        fetchWarehouseFailure: (state) => {
            state.loading = false;
            state.error = true;
        },
    }
})

export const {
    fetchWarehouseStart,
    fetchWarehouseSuccess,
    fetchWarehouseFailure,
} = warehouseSlice.actions;

export default warehouseSlice.reducer;