import {
  fetchCategoryFailure,
  fetchCategoryStart,
  fetchCategorySuccess,
} from '../../redux/slices/categoriesSlice';
import { request } from '../axios';

// Fetch categories
export const fetchCategories = async (dispatch) => {
  dispatch(fetchCategoryStart());
  try {
    const res = await request.get('/category/category');
    dispatch(fetchCategorySuccess(res?.data));
  } catch (error) {
    dispatch(fetchCategoryFailure(error));
  }
};
