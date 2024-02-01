import { db } from '../../firebase/firebase';
import {
  doc,
  collection,
  setDoc,
  onSnapshot,
  getDocs,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore';
import {
  fetchCartItemsFailure,
  fetchCartItemsStart,
  fetchCartItemsSuccess,
} from '../../redux/slices/cartItemsSlice';

// fetch cart items from Cart:
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

// Add item from Cart:
export const addToCart = async (
  userID,
  item,
  name,
  access,
  addedFrom,
  itemCharacter
) => {
  const itemData = {
    category: item?.category || [],
    cost: item?.cost || null,
    costSale: item?.costSale || null,
    description: item?.description || null,
    id: item?.id || null,
    image: item?.image || null,
    imageLink: item?.imageLink || null,
    issale: item?.issale,
    name: item?.name || null,
    supplier: item?.supplier || [],
    uid: `${item?.id}` || null,
  };
  const sendData = {
    item: itemData,
    quantity: 1,
  };
  if (addedFrom === 'addFromCards') {
    sendData.color = null;
    sendData.size = null;
    sendData.memory = null;
  } else {
    sendData.color = itemCharacter?.color !== '' ? itemCharacter?.color : null;
    sendData.memory =
      itemCharacter?.memory !== '' ? itemCharacter?.memory : null;
    sendData.size = itemCharacter?.size !== '' ? itemCharacter?.size : null;
  }
  const userDocRef = doc(db, 'users', `${userID}`);
  const cartCollectionRef = collection(userDocRef, 'cart');
  const unsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
    if (!docSnapshot.exists()) {
      setDoc(userDocRef, { name: name || null, token: access || null });
    }
  });

  try {
    await setDoc(doc(cartCollectionRef, `${item?.id}`), sendData);
    return { success: true };
  } catch (error) {
    alert(`Ошибка: ${error}`);
    return { success: false };
  } finally {
    unsubscribe();
  }
};

// Remove item from Cart:
export const removeFromCart = async (userID, itemID) => {
  try {
    const userDocRef = doc(db, 'users', `${userID}`);
    const cartCollectionRef = collection(userDocRef, 'cart');
    const querySnapshot = await getDocs(cartCollectionRef);

    const docToDelete = querySnapshot.docs.find(
      (doc) => doc.data().item.id === itemID
    );

    if (docToDelete) {
      await deleteDoc(docToDelete.ref);
    }
  } catch (error) {
    alert(`Ошибка: ${error}`);
  }
};

// Increment quantity
export const handleIncreaseQuantity = async (userID, itemId, count) => {
  const userDocRef = doc(db, 'users', `${userID}`);
  const cartItemRef = doc(userDocRef, 'cart', `${itemId}`);

  await updateDoc(cartItemRef, {
    quantity: count,
  });
};

// Decrement quantity
export const handleDecreaseQuantity = async (userID, itemId, count) => {
  const userDocRef = doc(db, 'users', `${userID}`);
  const cartItemRef = doc(userDocRef, 'cart', `${itemId}`);

  await updateDoc(cartItemRef, {
    quantity: count,
  });
};
