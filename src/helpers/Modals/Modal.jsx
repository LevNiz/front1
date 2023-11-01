import { NavLink } from 'react-router-dom';
import sosImg from './../../assets/images/sos.svg';
import inCorrectImg from './../../assets/images/404.svg';
import success from './../../assets/images/success.jpg';

const Modal = ({
  isOpen,
  onClose,
  content,
  logOutUser,
  onDelAddress,
  onDelBuyRequest,
}) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 flex items-center justify-center z-[999999]'>
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
      ) : content === 'deleteNotification' ? (
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
      ) : content === 'logout' ? (
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
      ) : content === 'notFound' ? (
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
      ) : content === 'deleteAddress' ? (
        <div className='bg-white p-6 rounded-[30px] shadow-md z-10 max-w-[360px] w-full'>
          <div className='flex justify-center py-5'>
            <img src={sosImg} alt='*' />
          </div>
          <h3 className='text-center text-xl mm:text-2xl font-medium'>
            Вы действительно хотите удалить данный сохраненный адрес?
          </h3>
          <div className='flex justify-center my-12 mm:my-16 space-x-5'>
            <button
              onClick={onClose}
              className='bg-black px-5 py-2 font-medium text-white rounded-[10px]'
            >
              Нет
            </button>
            <button
              onClick={onDelAddress}
              className='bg-white px-5 py-2 font-medium text-black border border-black rounded-[10px]'
            >
              Да
            </button>
          </div>
        </div>
      ) : content === 'deleteBuyRequest' ? (
        <div className='bg-white p-6 rounded-[30px] shadow-md z-10 max-w-[360px] w-full'>
          <div className='flex justify-center py-5'>
            <img src={sosImg} alt='*' />
          </div>
          <h3 className='text-center text-xl mm:text-2xl font-medium'>
            Вы действительно хотите удалить данную заявку?
          </h3>
          <div className='flex justify-center my-12 mm:my-16 space-x-5'>
            <button
              onClick={onClose}
              className='bg-black px-5 py-2 font-medium text-white rounded-[10px]'
            >
              Нет
            </button>
            <button
              onClick={onDelBuyRequest}
              className='bg-white px-5 py-2 font-medium text-black border border-black rounded-[10px]'
            >
              Да
            </button>
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
