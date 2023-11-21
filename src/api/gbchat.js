import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { axiosInstance } from './axios';

export const fetchGBChats = (userID, callBack) => {
  const q = query(
    collection(db, 'chat'),
    where('users', 'array-contains', `${userID}`),
    orderBy('lastMessageTime', 'desc')
  );

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const changedChats = querySnapshot.docs
      .filter((doc) => doc.data().users.includes(`${userID}`))
      .map((doc) => ({
        chatId: doc.id,
        data: doc.data(),
      }));

    callBack(changedChats);
  });

  return unsubscribe;
};

export const lastMessageReadUpdate = async (chatID, senderData) => {
  const userDocRef = doc(db, 'chat', `${chatID}`);
  const userDocSnapshot = await getDoc(userDocRef);

  if (userDocSnapshot?.data() && senderData?.id !== undefined) {
    if (userDocSnapshot?.data()?.lastMessageSender !== `${senderData?.id}`) {
      const updatedUserData = { lastMessageRead: true };
      updateDoc(userDocRef, updatedUserData);
    }
  }
};

export const fetchChatMessages = (chatID, senderData, callBack) => {
  let unsubscribe;

  const fetchMessages = () => {
    const messagesRef = collection(db, 'chat', `${chatID}`, 'messages');
    const queryMessages = query(messagesRef, orderBy('time'));

    unsubscribe = onSnapshot(queryMessages, (querySnapshot) => {
      const docIds = querySnapshot.docs?.map((doc) => ({
        id: doc.id,
        data: doc.data() || {},
      }));

      callBack(docIds);

      querySnapshot.forEach((chat) => {
        const docData = chat.data();
        if (docData.receiverUid === `${senderData?.id}` && !docData.read) {
          const messageRef = doc(
            db,
            'chat',
            `${chatID}`,
            'messages',
            `${chat.id}`
          );
          updateDoc(messageRef, { read: true });
        }
      });
    });
  };

  if (chatID) {
    fetchMessages();
  }

  return () => {
    if (unsubscribe) {
      unsubscribe();
    }
  };
};

export const gbChatNewMessage = (userID, callBack) => {
  const q = query(
    collection(db, 'chat'),
    where('users', 'array-contains', `${userID}`)
  );

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    let totalUnreadMessages = 0;

    querySnapshot.forEach((docSnap) => {
      const messagesRef = collection(docSnap.ref, 'messages');
      const messagesQuery = query(
        messagesRef,
        where('read', '==', false),
        where('receiverUid', '==', `${userID}`)
      );

      onSnapshot(messagesQuery, (messagesSnapshot) => {
        const unreadMessages = messagesSnapshot.docs.length;
        totalUnreadMessages = unreadMessages;

        callBack(totalUnreadMessages);
      });
    });
  });

  return unsubscribe;
};

export const createGBChat = async (chatID, receiverData, senderData) => {
  const userDocRef = doc(db, 'chat', `${chatID}`);
  const userDocSnapshot = await getDoc(userDocRef);

  if (!userDocSnapshot.exists()) {
    const chatDocData = {
      buyerChat: receiverData?.client?.user_type === 'buyer' ? true : false,
      lastMessage: 'Чат создан',
      lastMessageRead: false,
      lastMessageReceiverAvatar: receiverData?.client?.avatar || '',
      lastMessageReceiverName: receiverData?.client?.fullname || '',
      lastMessageSender: `${senderData?.id}` || '',
      lastMessageSenderAvatar: senderData?.avatar || '',
      lastMessageSenderName: senderData?.fullname || '',
      lastMessageTime: serverTimestamp(),
      uid: `${chatID}` || '',
      users: [`${senderData?.id}`, `${receiverData?.client?.id}` || ''],
    };
    if (receiverData?.client?.user_type === 'client') {
      chatDocData.lastMessageReceiver = receiverData?.client?.id;
    }
    await setDoc(userDocRef, chatDocData);
  }

  return { success: true };
};

export const sendMessage = async (e, inputVal, senderData, chatData) => {
  e.preventDefault();

  const trimmedInput = inputVal.trim();
  if (trimmedInput === '') {
    return;
  }

  const userDocRef = doc(db, 'chat', `${chatData?.uid}`);

  const receiverID = chatData?.users?.filter(
    (id) => id !== `${senderData?.id}`
  );

  await addDoc(collection(userDocRef, 'messages'), {
    text: trimmedInput,
    image: '',
    time: serverTimestamp(),
    read: false,
    receiverUid: receiverID[0],
    senderUid: `${senderData?.id}`,
  });

  const messageRef = doc(db, 'chat', `${chatData?.uid}`);

  await updateDoc(messageRef, {
    lastMessage: trimmedInput,
    lastMessageRead: false,
    lastMessageSender: `${senderData?.id}`,
    lastMessageTime: serverTimestamp(),
  });
};

export const sendGBChatImage = async (senderData, chatData, file) => {
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
      const userDocRef = doc(db, 'chat', `${chatData?.uid}`);

      const receiverID = chatData?.users?.filter(
        (id) => id !== `${senderData?.id}`
      );

      await addDoc(collection(userDocRef, 'messages'), {
        text: '',
        image: imgLink,
        time: serverTimestamp(),
        read: false,
        receiverUid: receiverID[0],
        senderUid: `${senderData?.id}`,
      });

      const messageRef = doc(db, 'chat', `${chatData?.uid}`);

      await updateDoc(messageRef, {
        lastMessage: 'файл',
        lastMessageRead: false,
        lastMessageSender: `${senderData?.id}`,
        lastMessageTime: serverTimestamp(),
      });
    }
  } catch (error) {
    ('');
  }
};
