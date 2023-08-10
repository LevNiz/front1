import sosImg from './../../assets/images/sos.svg';
import inCorrectImg from './../../assets/images/404.svg';
import { NavLink } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const Modal = ({ isOpen, onClose, content }) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 flex items-center justify-center z-50'>
      <div
        onClick={onClose}
        className='absolute inset-0 bg-gray-800 opacity-50'
      ></div>
      {content == 'deleteAllNotifications' ? (
        <div className='bg-white p-6 rounded-[30px] shadow-md z-10 max-w-[360px]'>
          <div className='flex justify-center py-5'>
            <img src={sosImg} alt='*' />
          </div>
          <h3 className='text-center text-2xl font-medium'>
            Вы уверены, что хотите удалить все сообщения?
          </h3>
          <div className='flex justify-center my-16 space-x-5'>
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
        <div className='bg-white p-6 rounded-[30px] shadow-md z-10 max-w-[360px]'>
          <div className='flex justify-center py-5'>
            <img src={sosImg} alt='*' />
          </div>
          <h3 className='text-center text-2xl font-medium'>
            Вы уверены, что хотите удалить сообщениe?
          </h3>
          <div className='flex justify-center my-16 space-x-5'>
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
      ) : (
        <div className='bg-white p-8 rounded-[30px] shadow-md z-10 max-w-[360px] text-center'>
          <div className='flex justify-center py-5'>
            <img src={inCorrectImg} alt='*' />
          </div>
          <h3 className='text-lg font-semibold'>
            Учетная запись с указанным номером уже существует!
          </h3>
          <p className='text-lg my-8'>Если забыли пароль?</p>
          <div className='flex px-8 mb-8'>
            <NavLink
              className='bg-colYellow w-full py-3 rounded-lg hover:bg-colYellowHover duration-100'
              to='#'
            >
              Восстановить
            </NavLink>
          </div>
          <NavLink to='/register' className='text-lg underline'>
            Регистрировать другой номер
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Modal;
