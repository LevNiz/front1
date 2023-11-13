import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../firebase/firebase';

export const fetchGBChats = async (userID, callBack) => {
  const q = query(
    collection(db, 'chat'),
    where('users', 'array-contains', `${userID}`),
    orderBy('lastMessageTime', 'desc')
  );
  onSnapshot(q, async (querySnapshot) => {
    const filteredChats = [];

    for (const docChange of querySnapshot.docChanges()) {
      if (docChange.type === 'added') {
        const doc = docChange.doc;
        const data = doc.data() || {};
        const users = data.users || [];

        if (users.includes(`${userID}`)) {
          const chatId = doc.id;
          const messagesCollectionRef = collection(
            db,
            'chat',
            chatId,
            'messages'
          );
          const messagesSnapshot = await getDocs(messagesCollectionRef);
          const messages = [];

          messagesSnapshot.forEach((messageDoc) => {
            messages.push({
              id: messageDoc.id,
              data: messageDoc.data(),
            });
          });

          filteredChats.push({
            chatId: chatId,
            data: data,
            messages: messages,
          });
        }
      }
    }

    callBack(filteredChats);
  });
};

export const fetchChatMessages = (chatID, callback) => {
  const q = query(
    collection(db, 'chat', `${chatID}`, 'messages'),
    orderBy('time')
  );

  const querySnap = onSnapshot(q, (querySnapshot) => {
    // querySnapshot.forEach((chat) => {
    //   const docData = chat.data();

    //   if (docData.receiverUid == chatID && !docData.read) {
    //     const messageRef = doc(
    //       db,
    //       'support_chat',
    //       `${chatID}`,
    //       'messages',
    //       `${chat.id}`
    //     );

    //     updateDoc(messageRef, { read: true });
    //   }
    // });

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
