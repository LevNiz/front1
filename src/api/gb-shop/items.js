import {
  fetchItemsFailure,
  fetchItemsStart,
  fetchItemsSuccess,
} from '../../redux/slices/categoriesSlice';
import { request } from '../axios';

// Fetch categories
export const fetchItems = async (dispatch) => {
  dispatch(fetchItemsStart());
  try {
    const res = await request.get('/core/item');
    dispatch(fetchItemsSuccess(res?.data));
  } catch (error) {
    dispatch(fetchItemsFailure(error));
  }
};
