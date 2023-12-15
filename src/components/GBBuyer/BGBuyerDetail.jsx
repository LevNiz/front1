import { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { createGBChat } from '../../api/gbchat';
import { fetchUser } from '../../api/client';
import { fetchBuyersDetail } from '../../api/buyer';
import { ButtonLoading, ContentLoading } from '../../helpers/Loader/Loader';
import noAva from '../../assets/images/no-ava.jpeg';
import instaTick from '../../assets/icons/insta-tick.png';
import star from '../../assets/icons/star.png';
import call from '../../assets/icons/new-call.svg';
import mail from '../../assets/icons/mail.svg';
import instagram from '../../assets/icons/Instagram.svg';
import telegram from '../../assets/icons/telegram.svg';
import whatsapp from '../../assets/icons/whatsapp2.svg';
import messenger from '../../assets/icons/cib_messenger.svg';

const BGBuyerDetail = () => {
  const { userID } = useSelector((state) => state?.user);
  const [buyerItem, setBuyerItem] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [senderData, setSenderData] = useState({});

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const { success, data } = await fetchUser(userID);
      if (success) {
        setSenderData(data);
      }
    })();
  }, [userID]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const { success, data } = await fetchBuyersDetail(id);
      if (success) {
        setBuyerItem(data);
        setIsLoading(false);
      }
      setIsLoading(false);
    })();
  }, [id]);

  const handleCreateGBChat = async () => {
    setIsButtonLoading(true);
    if (userID) {
      const chatID = `${userID}${buyerItem?.id}`;
      const chatIDCheck = `${buyerItem?.id}${userID}`;

      const { success, data } = await createGBChat(
        chatID,
        buyerItem,
        senderData,
        chatIDCheck
      );
      if (success) {
        navigate(
          `/gb-chat/t/${
            data?.lastMessageSender === `${userID}` ? chatID : chatIDCheck
          }`
        );
        setIsButtonLoading(false);
      }
      setIsButtonLoading(false);
    } else {
      navigate('/auth/sign-in');
    }
  };

  return (
    <div className='content min-h-[728px] pt-12 pb-20'>
      {isLoading ? (
        <ContentLoading extraStyle='580px' />
      ) : (
        <div className='ld:flex justify-between flex-row mt-10 md:mt-20 ld:shadow-[0px_10px_20px_0px_rgba(204,_204,_204,_0.40)] ld:p-7 rounded-2xl'>
          <div className='ld:w-1/2 md:w-2/5 lg:w-1/4 text-center'>
            <div className='ld:py-6 ld:px-4 p-3 bg-[#F4F4F4] rounded-xl'>
              <div className='w-40 min-w-[160px] h-40 ld:w-36 ld:min-w-[144px] ld:h-36 rounded-full overflow-hidden p-[2px] mx-auto'>
                <img
                  className='w-full h-full object-cover rounded-full'
                  src={buyerItem?.avatar}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = noAva;
                  }}
                  alt='*'
                />
              </div>
              <div className='flex justify-center items-center pt-4'>
                <h2 className='font-medium text-lg'>{buyerItem?.fullname}</h2>
                <img className='ml-1 w-8' src={instaTick} alt='*' />
              </div>
              <p className='opacity-80 text-sm mt-2 mb-2 ld:mb-5'>
                {buyerItem?.countries &&
                  buyerItem?.countries
                    ?.map((country) => country?.nameRu)
                    .join(', ')}
              </p>
              <div className='flex justify-center items-center space-x-1 my-1'>
                <img className='w-4' src={star} alt='*' />
                <img className='w-4' src={star} alt='*' />
                <img className='w-4' src={star} alt='*' />
                <img className='w-4' src={star} alt='*' />
                <img className='w-4' src={star} alt='*' />
              </div>
              <p className='mt-3 ld:my-7'>{`"${buyerItem?.info}"`}</p>
            </div>
            <div className='w-full mt-8'>
              <button
                onClick={handleCreateGBChat}
                className='text-lg font-medium hover:opacity-80 px-4 h-12 rounded-lg bg-black text-white duration-150 w-full'
              >
                {isButtonLoading ? <ButtonLoading /> : 'Написать'}
              </button>
            </div>
          </div>
          <div className='lg:flex ld:w-1/2 md:w-3/5 lg:w-3/4 pt-10 ld:pt-0'>
            <div className='lg:w-3/5 ld:pl-5 lg:px-8 lg:border-r-4 border-colYellow'>
              <h3 className='text-xl font-medium'>О себе</h3>
              <p className='pt-2'>
                Lorem ipsum dolor sit amet consectetur. Nibh nibh quis ut vel.
                Egestas nullam amet nullam mi pellentesque pharetra elementum.
                Mauris diam cras fermentum pharetra habitant quis fames
                facilisis. Quisque non lectus faucibus non massa varius
                vulputate orci.
              </p>
              <h3 className='text-xl font-medium mt-5'>
                Страны в которых совершаю покупки
              </h3>
              <p className='pt-2'>
                {buyerItem?.countries &&
                  buyerItem?.countries
                    ?.map((country) => country?.nameRu)
                    .join(', ')}
              </p>
              <h3 className='text-xl font-medium mt-5'>
                Подбор и поиск товаров
              </h3>
              <p className='pt-2'>
                Lorem ipsum dolor sit amet consectetur. Nibh nibh quis ut{' '}
              </p>
              <h3 className='text-xl font-medium mt-5'>
                Отзывы других пользователей{' '}
              </h3>
              <p className='pt-2'>
                Lorem ipsum dolor sit amet consectetur. Nibh nibh quis ut vel.
                Egestas nullam amet nullam mi pellentesque pharetra elementum.{' '}
                <span className='text-colYellow font-medium cursor-pointer'>
                  Читать дальше
                </span>
              </p>
            </div>
            <div className='lg:w-2/5 pt-5 ld:pt-0 ld:pl-8'>
              <h3 className='text-xl font-medium'>Стаж работы</h3>
              <p className='pt-2'>Более 3 лет</p>
              <h3 className='text-xl font-medium mt-5'>Размер комисии</h3>
              <p className='pt-2'>15%</p>
              <h3 className='text-xl font-medium mt-5'>Скорость выкупа</h3>
              <p className='pt-2'>3-4 дня</p>
              <h3 className='text-xl font-medium mt-5'>Способ оплаты</h3>
              <p className='pt-2'>VISA, MasterCard</p>
              <h3 className='text-xl font-medium mt-5'>Контакты</h3>
              <div className='flex items-center my-4'>
                <img src={call} alt='*' />
                <span className='ml-2'>{buyerItem?.phone}</span>
              </div>
              <div className='flex'>
                <img src={mail} alt='*' />
                <span className='ml-2'>{buyerItem?.login}</span>
              </div>
              <div className='flex justify-center ld:justify-start items-center space-x-4 pt-10'>
                <NavLink to='#'>
                  <img className='w-7' src={whatsapp} alt='*' />
                </NavLink>
                <NavLink to='#'>
                  <img className='w-7' src={instagram} alt='*' />
                </NavLink>
                <NavLink to='#'>
                  <img className='w-7' src={telegram} alt='*' />
                </NavLink>
                <NavLink to='#'>
                  <img className='w-7' src={messenger} alt='*' />
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BGBuyerDetail;
