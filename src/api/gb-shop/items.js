import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import {
  fetchItemsFailure,
  fetchItemsStart,
  fetchItemsSuccess,
} from '../../redux/slices/itemsSlice';
import { request } from '../axios';
import { db } from '../../firebase/firebase';

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

// Fetch Favorite items:
export const fetchFavoriteItems = async (userID) => {
  try {
    const userDocRef = doc(db, 'users', `25`);
    const userDocSnapshot = await getDoc(userDocRef);

    if (userDocSnapshot.exists()) {
      const favCollectionRef = collection(userDocRef, 'favs');
      const favSnapshot = await getDocs(favCollectionRef);
      const favData = favSnapshot.docs.map((doc) => doc.data());
      return favData;
    } else {
      return [];
    }
  } catch (error) {
    return 'error';
  }
};
