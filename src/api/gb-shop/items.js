import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  setDoc,
} from 'firebase/firestore';
import {
  fetchItemsFailure,
  fetchItemsStart,
  fetchItemsSuccess,
} from '../../redux/slices/itemsSlice';
import {
  fetchFavItemsStart,
  fetchFavItemsSuccess,
  fetchFavItemsFailure,
} from '../../redux/slices/favItemsSlice';
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
export const fetchFavoriteItems = (userID, dispatch) => {
  dispatch(fetchFavItemsStart());

  const userDocRef = doc(db, 'users', `${userID}`);
  const favCollectionRef = collection(userDocRef, 'favs');

  const unsubscribe = onSnapshot(
    favCollectionRef,
    (snapshot) => {
      const favData = snapshot.docs.map((doc) => doc.data());
      dispatch(fetchFavItemsSuccess(favData));
    },
    (error) => {
      dispatch(fetchFavItemsFailure(error));
    }
  );

  return unsubscribe;
};

// Add item to Favorites using setDoc:
export const addToFavorites = async (userID, el, name, access) => {
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

  const userDocRef = doc(db, 'users', `${userID}`);
  const favsCollectionRef = collection(userDocRef, 'favs');

  const unsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
    if (!docSnapshot.exists()) {
      setDoc(userDocRef, { name: name || '', token: access || '' });
    }
  });

  try {
    await setDoc(doc(favsCollectionRef, `${el?.id}`), sendData);
  } catch (error) {
    alert(`Ошибка: ${error}`);
  } finally {
    unsubscribe();
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
    alert(`Ошибка: ${error}`);
  }
};
// Filter by supplier:
export const fetchBrandsItem = async (id) => {
  try {
    const res = await request.get(`core/item/?supplier=${id}`);
    return { success: true, data: res?.data?.results };
  } catch (error) {
    return { success: false, data: 'error' };
  }
};
