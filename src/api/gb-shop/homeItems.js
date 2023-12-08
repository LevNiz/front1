import {
  fetchGBShopItemsFailure,
  fetchGBShopItemsStart,
  fetchGBShopItemsSuccess,
} from '../../redux/slices/gbShopItemsSlice';
import { request } from '../axios';

// fetch home items:
export const fetchHomeItems = async (dispatch) => {
  dispatch(fetchGBShopItemsStart());
  try {
    const res = await request.get('core/five_item/');
    dispatch(fetchGBShopItemsSuccess(res?.data?.data));
  } catch (error) {
    dispatch(fetchGBShopItemsFailure(error));
  }
};
