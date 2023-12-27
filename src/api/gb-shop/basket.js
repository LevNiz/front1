import { db } from '../../firebase/firebase';
import { doc, collection, setDoc, onSnapshot } from 'firebase/firestore';
import {
  fetchCartItemsFailure,
  fetchCartItemsStart,
  fetchCartItemsSuccess,
} from '../../redux/slices/cartItemsSlice';

export const fetchBasketData = (userID, dispatch) => {
  dispatch(fetchCartItemsStart());

  const userDocRef = doc(db, 'users', `${userID}`);
  const cartCollectionRef = collection(userDocRef, 'cart');

  const unsubscribe = onSnapshot(
    cartCollectionRef,
    (snapshot) => {
      const cartData = snapshot.docs.map((doc) => doc.data());
      dispatch(fetchCartItemsSuccess(cartData));
    },
    (error) => {
      dispatch(fetchCartItemsFailure(error));
    }
  );

  return unsubscribe;
};

export const addToCart = async (userID, item) => {
  const itemData = {
    category: item?.category || [],
    cost: item?.cost || '',
    costSale: item?.costSale || '',
    description: item?.description || '',
    id: item?.id || '',
    image: item?.image || '',
    imageLink: item?.imageLink || '',
    issale: item?.issale,
    name: item?.name || '',
    supplier: item?.supplier || [],
    uid: `${item?.id}` || '',
  };
  const sendData = {
    item: itemData,
    quantity: 1,
  };
  try {
    const userDocRef = doc(db, 'users', `${userID}`);
    const cartCollectionRef = collection(userDocRef, 'cart');

    await setDoc(doc(cartCollectionRef, `${item?.id}`), sendData);
    return { success: true };
  } catch (error) {
    return { success: false };
  }
};
