import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import { useEffect, useState } from 'react';
import { SupportChatsNewMessage } from '../../api/techChat';
import { useDispatch, useSelector } from 'react-redux';
import { gbChatNewMessage } from '../../api/gbchat';
import GBShopNavbar from '../Navbar/GBShopNavbar';
import GBShopFooter from '../Footer/GBShopFooter';
import { axiosInstance, baseURL } from '../../api/axios';
import axios from 'axios';
import { logOutFetch } from '../../api/user';

const Layout = () => {
  const [TechChatNotification, setTechChatNotification] = useState(0);
  const [gbChatNotification, stGbChatNotification] = useState(true);

  const { userID } = useSelector((state) => state?.user);
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const firstPathSegment = pathname.split('/')[1];

  useEffect(() => {
    const fetchMessages = SupportChatsNewMessage(userID, (newDocData) => {
      const unreadMessages = newDocData.filter(
        (message) =>
          !message.data.read && message.data.receiverUid == `${userID}`
      );
      setTechChatNotification(unreadMessages?.length);
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

  axiosInstance.interceptors.response.use(
    (res) => res,
    async (error) => {
      if (error.config.url === 'https://givbox.ru/givbox/api/user/login/') {
        return error;
      }
      const originalRequest = error.config;
      if (
        error.response.status === 401 &&
        error.config &&
        !error.config._isRetry
      ) {
        error.config._isRetry = true;
        try {
          const response = await axios.post(`${baseURL}api/token/refresh/`, {
            refresh: localStorage.getItem('refreshToken'),
          });
          localStorage.setItem('accessToken', response.data.access);
          return axiosInstance.request(originalRequest);
        } catch (error) {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          logOutFetch(dispatch);
        }
      }
      throw error;
    }
  );

  return firstPathSegment === 'gb-shop' ? (
    <>
      <GBShopNavbar />
      <Outlet />
      <GBShopFooter />
    </>
  ) : (
    <>
      <Navbar
        gbChatNotification={gbChatNotification}
        TechChatNotification={TechChatNotification}
      />
      <Outlet context={TechChatNotification} />
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
