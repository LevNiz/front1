import {
  fetchAlaketStart,
  fetchAlaketSuccess,
  fetchAlaketFailure,
} from '../redux/slices/alaketSlice';
import { request } from './axios';

// Fetch alaket:
export const fetchAlaket = async (dispatch) => {
  dispatch(fetchAlaketStart());
  try {
    const res = await request.get('core/alaket/');
    dispatch(fetchAlaketSuccess(res?.data?.results));
  } catch (error) {
    dispatch(fetchAlaketFailure(error));
  }
};
