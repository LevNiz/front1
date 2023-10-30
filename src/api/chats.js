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
  updateDoc,
} from 'firebase/firestore';
import { db } from '../firebase/firebase.js';
import { axiosInstance } from './axios.js';

// Support Chat:
export const fetchSupportChats = (userID, callback) => {
  const q = query(
    collection(db, 'support_chat', `${userID}`, 'messages'),
    orderBy('time')
  );

  const querySnap = onSnapshot(q, (querySnapshot) => {
    querySnapshot.docChanges().forEach((change) => {
      if (change.type === 'added' || change.type === 'modified') {
        const docData = change.doc.data();
        if (docData.senderUid !== userID && !docData.read) {
          const messageDoc = doc(
            db,
            'support_chat',
            `${userID}`,
            'messages',
            change.doc.id
          );
          updateDoc(messageDoc, { read: true });
        }
      }
    });

    const docData = querySnapshot.docs.map((doc) => ({
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

export const sendImage = async (file, userID, inputVal, userData) => {
  if (!file) {
    return false;
  }

  const milliseconds = new Date().getMilliseconds();
  const formData = new FormData();
  formData.append('image', file);
  formData.append('title', milliseconds);

  const imgLink = {};

  try {
    const res = await axiosInstance.post('core/image/', formData);
    imgLink.image = res?.data?.image;
  } catch (error) {
    return { success: false };
  }
};
