import {
  fetchWarehouseFailure,
  fetchWarehouseStart,
  fetchWarehouseSuccess,
} from '../redux/slices/warehouseSlice';
import { request } from './axios';

// Fetch all warehouses:
export const fetchWareHouses = async (dispatch) => {
  dispatch(fetchWarehouseStart());
  try {
    const res = await request.get('core/depot/');
    dispatch(fetchWarehouseSuccess(res?.data?.results));
  } catch (error) {
    dispatch(fetchWarehouseFailure(error));
  }
};

// Fetch warehouses detail:
export const fetchWareHousesDetail = async (id) => {
  try {
    const res = await request.get(`core/depot/${id}/`);
    return { success: true, data: res?.data };
  } catch (error) {
    return { success: false, data: error };
  }
};
