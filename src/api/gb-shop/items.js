import {
  fetchItemsFailure,
  fetchItemsStart,
  fetchItemsSuccess,
} from '../../redux/slices/itemsSlice';
import { request } from '../axios';

// Fetch items
export const fetchItems = async (dispatch) => {
  dispatch(fetchItemsStart());
  try {
    const res = await request.get('/core/item');
    dispatch(fetchItemsSuccess(res?.data?.results));
  } catch (error) {
    dispatch(fetchItemsFailure(error));
  }
};

// Fetch items detail
export const fetchItemsDetail = async (id) => {
  try {
    const res = await request.get(`/core/item/${id}/`);
    return { success: true, data: res?.data };
  } catch (error) {
    return { success: false, data: error };
  }
};
