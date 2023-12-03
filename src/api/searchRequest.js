import {
  fetchSearchRequestFailure,
  fetchSearchRequestStart,
  fetchSearchRequestSuccess,
} from '../redux/slices/searchRequestSlice';
import { request } from './axios';

// fetch search request item
export const fetchSearchRequest = async (dispatch, userID) => {
  dispatch(fetchSearchRequestStart());
  try {
    const res = await request.get('core/item_search_request/');
    const myRequests = res?.data?.results?.filter(
      (el) => el?.client?.id === userID
    );
    console.log(myRequests);
    dispatch(fetchSearchRequestSuccess(res?.data?.results));
  } catch (error) {
    dispatch(fetchSearchRequestFailure(error));
  }
};
