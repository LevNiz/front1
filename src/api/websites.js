import {
  fetchWebsiteFailure,
  fetchWebsiteStart,
  fetchWebsiteSuccess,
} from '../redux/slices/websiteSlice';
import { request } from './axios';

// Fetch websites:
export const fetchWebsites = async (dispatch) => {
  dispatch(fetchWebsiteStart());
  try {
    const res = await request.get('category/website/');
    dispatch(fetchWebsiteSuccess(res?.data?.results));
  } catch (error) {
    dispatch(fetchWebsiteFailure(error));
  }
};
