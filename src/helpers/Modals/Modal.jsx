import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ContentLoading } from '../Loader/Loader';
import { ErrorServer } from '../Errors/ErrorServer';
import { ErrorEmpty } from '../Errors/ErrorEmpty';
import sosImg from './../../assets/images/sos.svg';
import inCorrectImg from './../../assets/images/404.svg';
import notFound from '../../assets/images/empty.svg';
import success from './../../assets/images/success.jpg';
import errorImg from './../../assets/images/error.svg';

const Modal = ({
  isOpen,
  onClose,
  content,
  logOutUser,
  onDelAddress,
  onDelBuyRequest,
  onDeleteSearchRequest,
  handleServicesData,
  services,
}) => {
  const { extraServices, loading, error } = useSelector(
    (state) => state?.extraServices
  );
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 flex items-center justify-center z-[9999999]'>
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
              Список пуст
            </h4>
            <p className='text-gray-500'>По вашему запросу ничего не нашли.</p>
          </div>
        </div>
      ) : content === 'extraServices' ? (
        <div className='bg-white py-3 mm:py-6 px-2 mm:px-6 mm:rounded-xl shadow-md mm:max-w-3xl w-full h-full mm:h-auto mm:w-[95%] z-10'>
          <span
            onClick={onClose}
            className='text-3xl pb-2 flex justify-end pr-3 mm:hidden cursor-pointer'
          >
            &times;
          </span>
          <div className='pr-3 mm:pr-5 pl-2 mm:pl-3 h-[93%] pb-5 mm:h-[480px] overflow-y-scroll scrollable'>
            <h1 className='text-xl pt-3 font-medium text-center'>
              Дополнительные услуги
            </h1>
            <p className='py-1 text-xs mm:text-base mb-5 text-center'>
              Вы можете заказать следующие SMART услуги до того, как ваша
              посылка поступить в наш скалад.
            </p>
            {loading ? (
              <ContentLoading extraStyle={320} />
            ) : error ? (
              <ErrorServer />
            ) : extraServices?.length ? (
              <div className='space-y-5'>
                {extraServices?.map((el) => (
                  <div
                    key={el?.id}
                    onClick={() => {
                      if (!services.includes(el)) {
                        handleServicesData(el);
                      }
                      onClose();
                    }}
                    className='flex justify-between shadow-[0_0_10px_#e5e3e3] py-2 px-3 rounded-lg cursor-pointer'
                  >
                    <div className='flex'>
                      <div className='w-6 min-w-[24px] h-6 mr-2'>
                        <img src={el?.icon} alt='*' />
                      </div>
                      <div className='px-1'>
                        <h5 className='text-sm'>{el?.nameRu}</h5>
                        {el?.infoRu && (
                          <p className='text-xs pt-1 italic'>{el?.infoRu}</p>
                        )}
                      </div>
                    </div>
                    <div className='text-lg font-bold flex'>
                      <span>~</span>
                      <span className='px-0.5'>{el?.cost}</span>
                      <span>$</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <ErrorEmpty
                title='Ничего не нашли!'
                desc='Пока нет дополнительных услуг.'
              />
            )}
          </div>
        </div>
      ) : content === 'successRequest' ? (
        <div className='bg-white p-8 rounded-[30px] shadow-md z-10 sm:max-w-[360px] w-[90%] sm:w-full text-center'>
          <div className='flex justify-center py-5'>
            <img src={success} alt='*' />
          </div>
          <h3 className='text-xl font-medium mb-8'>
            Ваша заявка успешна отправлена!
          </h3>
          <div className='flex px-8 mb-8'>
            <button
              className='bg-colYellow w-full py-3 font-medium rounded-lg hover:bg-colYellowHover duration-100'
              onClick={() => navigate(-1)}
            >
              Закрыть
            </button>
          </div>
        </div>
      ) : content === 'successUpdateRequest' ? (
        <div className='bg-white p-8 rounded-[30px] shadow-md z-10 sm:max-w-[360px] w-[90%] sm:w-full text-center'>
          <div className='flex justify-center py-5'>
            <img src={success} alt='*' />
          </div>
          <h3 className='text-xl font-medium mb-8'>
            Ваша заявка успешна изменена!
          </h3>
          <div className='flex px-8 mb-8'>
            <span
              className='bg-colYellow w-full cursor-pointer py-3 font-medium rounded-lg hover:bg-colYellowHover duration-100'
              onClick={() => {
                onClose();
                navigate(-1);
              }}
            >
              Закрыть
            </span>
          </div>
        </div>
      ) : content === 'errorRequest' ? (
        <div className='bg-white p-8 rounded-[30px] shadow-md z-10 sm:max-w-[420px] w-[90%] sm:w-full text-center'>
          <div className='flex justify-center pt-5'>
            <img src={errorImg} alt='*' />
          </div>
          <h3 className='text-xl font-medium'>Произошла ошибка!</h3>
          <p className='text-sm mt-1 mb-4 opacity-60'>
            Повторите попытку еще раз.
          </p>
          <div className='flex px-8 mb-8'>
            <button
              className='bg-colYellow w-full py-3 font-medium rounded-lg hover:bg-colYellowHover duration-100'
              onClick={onClose}
            >
              Закрыть
            </button>
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
      ) : content === 'deleteSearchRequest' ? (
        <div className='bg-white p-6 rounded-[30px] shadow-md z-10 max-w-[360px] w-full'>
          <div className='flex justify-center py-5'>
            <img src={sosImg} alt='*' />
          </div>
          <h3 className='text-center text-xl mm:text-2xl font-medium'>
            Вы действительно хотите удалить данную заявку??
          </h3>
          <div className='flex justify-center my-12 mm:my-16 space-x-5'>
            <button
              onClick={onClose}
              className='bg-black px-5 py-2 font-medium text-white rounded-[10px]'
            >
              Нет
            </button>
            <button
              onClick={onDeleteSearchRequest}
              className='bg-white px-5 py-2 font-medium text-black border border-black rounded-[10px]'
            >
              Да
            </button>
          </div>
        </div>
      ) : (
        <div className='bg-white p-8 rounded-[30px] shadow-md z-10 max-w-[360px] w-full text-center'>
          <div className='flex justify-center py-5'>
            <img src={notFound} alt='*' />
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
