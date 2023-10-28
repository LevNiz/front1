import {
  query,
  collection,
  onSnapshot,
  serverTimestamp,
  addDoc,
  orderBy,
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore';
import { db } from '../firebase/firebase.js';

// Support Chat:
export const fetchSupportChats = (userID, callback) => {
  const q = query(collection(db, 'support_chat', `${userID}`, 'messages'), orderBy('time'));
  const querySnap = onSnapshot(q, (querySnapshot) => {
    const docData = querySnapshot.docs?.map((doc) => ({
      id: doc.id,
      data: doc.data() || {},
    }));

    callback(docData);
  });

  return () => {
    querySnap();
  };
};

export const sendMessage = async (e, userID, inputVal, userData) => {
  e.preventDefault();

  const trimmedInput = inputVal.trim();
  if (trimmedInput === '') {
    return;
  }

  const userDocRef = doc(db, 'support_chat', `${userID}`);
  const userDocSnapshot = await getDoc(userDocRef);

  if (!userDocSnapshot.exists()) {
    await setDoc(userDocRef, {
      clientId: userID,
      clientName: userData?.fullname,
      avatar: userData?.avatar,
    });
  }

  await addDoc(collection(userDocRef, 'messages'), {
    text: trimmedInput,
    image: '',
    time: serverTimestamp(),
    read: false,
    receiverUid: 'admin',
    senderUid: userID,
  });
};
