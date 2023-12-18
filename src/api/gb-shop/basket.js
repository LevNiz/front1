import { db } from '../../firebase/firebase';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';

export const fetchBasketData = async (userID) => {
  try {
    const userDocRef = doc(db, 'users', `25`);
    const userDocSnapshot = await getDoc(userDocRef);

    if (userDocSnapshot.exists()) {
      const cartCollectionRef = collection(userDocRef, 'cart');
      const cartSnapshot = await getDocs(cartCollectionRef);
      const cartData = cartSnapshot.docs.map((doc) => doc.data());
      return cartData;
    } else {
      return [];
    }
  } catch (error) {
    console.error(error);
  }
};
