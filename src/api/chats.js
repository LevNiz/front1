import {
  query,
  collection,
  onSnapshot,
  serverTimestamp,
  addDoc,
} from 'firebase/firestore';
import { db } from '../firebase/firebase.js';

// Support Chat:
export const fetchSupportChats = (userID, callback) => {
  const q = query(collection(db, 'support_chat', `${userID}`, 'messages'));
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

export const sendMessage = async (e, userID) => {
  e.preventDefault();

  // const trimmedInput = input.trim();
  // if (trimmedInput === '') {
  //   return;
  // }

  // setInput('');

  await addDoc(collection(db, 'support_chat', `${userID}`, 'messages'), {
    //   text: trimmedInput,
    image: '',
    time: serverTimestamp(),
    read: false,
    receiverUid: 'admin',
    senderUid: userID,
  });
};
