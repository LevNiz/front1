import {
  fetchItemsFailure,
  fetchItemsStart,
  fetchItemsSuccess,
} from '../../redux/slices/itemsSlice';
import { request } from '../axios';

// Fetch categories
export const fetchItems = async (dispatch) => {
  dispatch(fetchItemsStart());
  try {
    const res = await request.get('/core/item');
    dispatch(fetchItemsSuccess(res?.data?.results));
  } catch (error) {
    dispatch(fetchItemsFailure(error));
  }
};
