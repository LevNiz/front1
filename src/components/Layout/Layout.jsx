import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import { useEffect, useState } from 'react';
import { SupportChatsNewMessage } from '../../api/chats';
import { useSelector } from 'react-redux';
import { gbChatNewMessage } from '../../api/gbchat';

const Layout = () => {
  const [hasNotification, setHasNotification] = useState(0);
  const [gbChatNotification, stGbChatNotification] = useState(0);

  const { userID } = useSelector((state) => state?.user);
  const { pathname } = useLocation();

  const pathParts = pathname.split('/');
  const firstPathSegment = pathParts[1];

  useEffect(() => {
    const fetchMessages = SupportChatsNewMessage(userID, (newDocData) => {
      const unreadMessages = newDocData.filter(
        (message) =>
          !message.data.read && message.data.receiverUid == `${userID}`
      );
      setHasNotification(unreadMessages?.length);
    });

    return () => {
      fetchMessages();
    };
  }, [userID]);

  useEffect(() => {
    const unsubscribe = gbChatNewMessage(userID, (newDocData) => {
      stGbChatNotification(newDocData);
    });

    return () => {
      unsubscribe();
    };
  }, [userID]);

  return (
    <>
      <Navbar
        gbChatNotification={gbChatNotification}
        hasNotification={hasNotification}
      />
      <Outlet context={hasNotification} />
      {firstPathSegment === 'profile' ? (
        ''
      ) : firstPathSegment === 'gb-chat' ? (
        ''
      ) : (
        <Footer />
      )}
    </>
  );
};

export default Layout;
