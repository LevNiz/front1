import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from '../firebase/firebase';

export const fetchGBChats = async (userID, callBack) => {
  const q = query(
    collection(db, 'chat'),
    where('users', 'array-contains', `${userID}`),
    orderBy('lastMessageTime', 'desc')
  );

  try {
    const querySnapshot = await getDocs(q);

    const filteredChats = await Promise.all(
      querySnapshot.docs
        .filter((doc) => doc.data()?.users.includes(`${userID}`))
        .map(async (doc) => {
          const chatId = doc.id;
          const messagesCollectionRef = collection(
            db,
            'chat',
            chatId,
            'messages'
          );
          const messagesSnapshot = await getDocs(messagesCollectionRef);
          const messages = messagesSnapshot.docs.map((messageDoc) => ({
            id: messageDoc.id,
            data: messageDoc.data(),
          }));

          return {
            chatId,
            data: doc.data(),
            messages,
          };
        })
    );

    callBack(filteredChats);
  } catch (error) {
    throw new Error(error);
  }
};

export const fetchChatMessages = async (
  chatID,
  senderData,
  receiver,
  callback
) => {
  const userDocRef = doc(db, 'chat', `${chatID}`);
  const userDocSnapshot = await getDoc(userDocRef);

  if (userDocSnapshot.exists()) {
    const q = query(
      collection(db, 'chat', `${chatID}`, 'messages'),
      orderBy('time')
    );
    const querySnap = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((chat) => {
        const docData = chat.data();
        if (docData.receiverUid == `${senderData?.id}` && !docData.read) {
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

      const docData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data() || {},
      }));

      callback(docData);
    });
    return () => {
      querySnap();
    };
  } else {
    await setDoc(userDocRef, {
      buyer: true,
      lastMessage: 'Чат создан',
      lastMessageRead: false,
      lastMessageReceiverAvatar: receiver?.avatar,
      lastMessageReceiverName: receiver?.fullname,
      lastMessageSender: `${senderData?.id}`,
      lastMessageSenderAvatar: senderData?.avatar,
      lastMessageSenderName: senderData?.fullname,
      lastMessageTime: serverTimestamp(),
      uid: `${chatID}`,
      users: [`${senderData?.id}`, `${receiver?.id}`],
    });
  }
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

  const unsubscribe = onSnapshot(userDocRef, () => {
    const messageRef = doc(db, 'chat', `${chatData?.uid}`);

    updateDoc(messageRef, {
      lastMessage: trimmedInput,
      lastMessageRead: true,
      lastMessageSender: `${senderData?.id}`,
      lastMessageTime: serverTimestamp(),
    });
  });

  return () => {
    unsubscribe();
  };
};
