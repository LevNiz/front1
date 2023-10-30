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

export const sendMessage = async (e, inputVal, userData, imgLink) => {
  e.preventDefault();
  const trimmedInput = inputVal.trim();
  if (trimmedInput === '') {
    return;
  }

  const userDocRef = doc(db, 'support_chat', `${userData?.id}`);
  const userDocSnapshot = await getDoc(userDocRef);

  if (!userDocSnapshot.exists()) {
    await setDoc(userDocRef, {
      clientId: userData?.id,
      clientName: userData?.fullname,
      avatar: userData?.avatar,
    });
  }

  await addDoc(collection(userDocRef, 'messages'), {
    text: trimmedInput,
    image: imgLink || '',
    time: serverTimestamp(),
    read: false,
    receiverUid: 'admin',
    senderUid: userData?.id,
  });
};

export const sendImage = async (file, userData) => {
  if (!file) {
    return false;
  }
  const milliseconds = new Date().getMilliseconds();
  const formData = new FormData();
  formData.append('image', file);
  formData.append('title', milliseconds);

  try {
    const res = await axiosInstance.post('core/image/', formData);
    const imgLink = res?.data?.image;
    if (imgLink) {
      const userDocRef = doc(db, 'support_chat', `${userData?.id}`);
      const userDocSnapshot = await getDoc(userDocRef);

      if (!userDocSnapshot.exists()) {
        await setDoc(userDocRef, {
          clientId: userData?.id,
          clientName: userData?.fullname,
          avatar: userData?.avatar,
        });
      }

      await addDoc(collection(userDocRef, 'messages'), {
        text: '',
        image: imgLink,
        time: serverTimestamp(),
        read: false,
        receiverUid: 'admin',
        senderUid: userData?.id,
      });
    }
  } catch (error) {
    return { success: false };
  }
};
