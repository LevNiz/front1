import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from 'firebase/firestore';
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
    const userDocRef = doc(db, 'users', `${userID}`);
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

// Add item to Favorites using setDoc:
export const addToFavorites = async (userID, el) => {
  const sendData = {
    category: el?.category?.id || '',
    cost: el?.cost || '',
    costSale: el?.costSale || '',
    description: el?.description || '',
    id: el?.id || '',
    image: el?.image || '',
    imageLink: el?.imageLink || '',
    issale: el?.issale || '',
    name: el?.name || '',
    supplier: el?.supplier || [],
    uid: `${el?.id}` || '',
  };
  try {
    const userDocRef = doc(db, 'users', `${userID}`);
    const favCollectionRef = collection(userDocRef, 'favs');

    await setDoc(doc(favCollectionRef, `${el?.id}`), sendData);
  } catch (error) {
    console.error('Error adding to favorites', error);
  }
};

// Remove item from Favorites:
export const removeFromFavorites = async (userID, itemID) => {
  try {
    const userDocRef = doc(db, 'users', `${userID}`);
    const favCollectionRef = collection(userDocRef, 'favs');
    const querySnapshot = await getDocs(favCollectionRef);

    const docToDelete = querySnapshot.docs.find(
      (doc) => doc.data().id === itemID
    );

    if (docToDelete) {
      await deleteDoc(docToDelete.ref);
    }
  } catch (error) {
    console.error('Error removing from favorites', error);
  }
};
