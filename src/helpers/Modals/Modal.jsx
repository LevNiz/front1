import sosImg from './../../assets/images/sos.svg';
import inCorrectImg from './../../assets/images/404.svg';
import success from './../../assets/images/success.jpg';
import { NavLink } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const Modal = ({ isOpen, onClose, content, logOutUser }) => {
  if (!isOpen) return null;

  const addresses = [];

  return (
    <div className='fixed inset-0 flex items-center justify-center px-3 z-[999999]'>
      <div
        onClick={onClose}
        className='absolute inset-0 bg-gray-800 opacity-50'
      ></div>
      {content == 'deleteAllNotifications' ? (
        <div className='bg-white p-6 rounded-[30px] shadow-md z-10 max-w-[360px] w-full'>
          <div className='flex justify-center py-5'>
            <img src={sosImg} alt='*' />
          </div>
          <h3 className='text-center text-xl mm:text-2xl font-medium'>
            Вы уверены, что хотите удалить все сообщения?
          </h3>
          <div className='flex justify-center my-12 mm:my-16 space-x-5'>
            <button
              onClick={onClose}
              className='bg-black px-5 py-2 font-medium text-white rounded-[10px]'
            >
              Нет
            </button>
            <button className='bg-white px-5 py-2 font-medium text-black border border-black rounded-[10px]'>
              Да
            </button>
          </div>
        </div>
      ) : content == 'deleteNotification' ? (
        <div className='bg-white p-6 rounded-[30px] shadow-md z-10 max-w-[360px] w-full'>
          <div className='flex justify-center py-5'>
            <img src={sosImg} alt='*' />
          </div>
          <h3 className='text-center text-xl mm:text-2xl font-medium'>
            Вы уверены, что хотите удалить сообщениe?
          </h3>
          <div className='flex justify-center my-12 mm:my-16 space-x-5'>
            <button
              onClick={onClose}
              className='bg-black px-5 py-2 font-medium text-white rounded-[10px]'
            >
              Нет
            </button>
            <button className='bg-white px-5 py-2 font-medium text-black border border-black rounded-[10px]'>
              Да
            </button>
          </div>
        </div>
      ) : content == 'logout' ? (
        <div className='bg-white p-6 rounded-[30px] shadow-md z-10 max-w-[360px] w-full'>
          <div className='flex justify-center py-5'>
            <img src={sosImg} alt='*' />
          </div>
          <h3 className='text-center text-xl mm:text-2xl font-medium'>
            Вы действительно хотите выйти из аккаунта?
          </h3>
          <div className='flex justify-center my-12 mm:my-16 space-x-5'>
            <button
              onClick={onClose}
              className='bg-black px-5 py-2 font-medium text-white rounded-[10px]'
            >
              Нет
            </button>
            <button
              onClick={logOutUser}
              className='bg-white px-5 py-2 font-medium text-black border border-black rounded-[10px]'
            >
              Да
            </button>
          </div>
        </div>
      ) : content == 'notFound' ? (
        <div className='bg-white p-8 rounded-[30px] shadow-md z-10 max-w-[360px] w-full text-center'>
          <div className='py-10'>
            <img className='mx-auto' src={inCorrectImg} alt='*' />
            <h4 className='text-center font-medium mt-5 text-xl'>
              По вашему запросу ничего не нашли...
            </h4>
          </div>
        </div>
      ) : content === 'successRequest' ? (
        <div className='bg-white p-8 rounded-[30px] shadow-md z-10 max-w-[360px] w-full text-center'>
          <div className='flex justify-center py-5'>
            <img src={success} alt='*' />
          </div>
          <h3 className='text-xl font-medium mb-8'>
            Ваша заявка успешна отправлена!
          </h3>
          <div className='flex px-8 mb-8'>
            <NavLink
              className='bg-colYellow w-full py-3 font-medium rounded-lg hover:bg-colYellowHover duration-100'
              to='/'
            >
              Перейти на главную
            </NavLink>
          </div>
        </div>
      ) : content === 'AddressModal' ? (
        <div className='bg-white p-8 rounded-md h-[90vh] shadow-md z-10 max-w-[90%] w-full text-center'>
          <h3 className='text-2xl font-medium mb-8'>Выберите адрес</h3>
            <div>
              {addresses?.length ? (
                ''
              ) : (
                <div className='text-center max-w-[320px]'>
                  <img className='mx-auto mb-5' src={inCorrectImg} alt="*" />
                  <h3 className='text-xl font-medium max-w-[260px] mx-auto'>Здесь пока пусто!</h3>
                  <p className='text-sm opacity-75 max-w-[260px] my-2'>Нажав на кнопку ниже, вы можете добавить свои адреса.</p>
                </div>
              )}
              <div className='flex justify-end w-max ml-auto'>
                <button className='bg-colYellow py-3 px-6 font-medium rounded-md hover:bg-colYellowHover duration-100'>
                  + Добавить адрес
                </button>
              </div>
            </div>
        </div>
      ) : (
        <div className='bg-white p-8 rounded-[30px] shadow-md z-10 max-w-[360px] w-full text-center'>
          <div className='flex justify-center py-5'>
            <img src={inCorrectImg} alt='*' />
          </div>
          <h3 className='text-lg font-semibold'>Неверный логин или пароль</h3>
          <p className='text-base mt-8 mb-4'>Забыли пароль?</p>
          <div className='flex px-8 mb-8'>
            <NavLink
              className='bg-colYellow w-full py-3 rounded-lg hover:bg-colYellowHover duration-100'
              to='/auth/reset-password'
            >
              Восстановить
            </NavLink>
          </div>
          <p className='text-sm mt-8 mb-1'>У вас нет аккаунта?</p>
          <NavLink to='/auth/sign-up' className='text-base underline'>
            Зарегистрироваться
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Modal;
