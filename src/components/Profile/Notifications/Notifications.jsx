import { NavLink, Outlet } from 'react-router-dom';
import { notifications } from '../../../constants/notificationsData';
import noNotifications from '../../../assets/images/no-notification.png';

const Notifications = () => {
  return (
    <>
      {notifications?.length > 0 ? (
        <div className='content py-4 grid grid-cols-2 gap-5'>
          <div className='px-8'>
            <div className='flex justify-between items-center pb-5'>
              <div className='flex items-center'>
                <span className='font-medium'>Недавние</span>
                <span className='bg-red-500 text-white min-w-[16px] h-[16px] text-[10px] rounded-full text-center ml-2 mb-1'>
                  4
                </span>
              </div>
              <div className='text-sm text-red-500 cursor-pointer'>
                Удалить все
              </div>
            </div>
            {notifications?.map((el, index) => (
              <NavLink
                to={`${el.id}`}
                key={index}
                className='flex my-3 border-b sidebar border-colBgGray2 pb-3 hover:bg-colBgGray2 p-3 rounded-lg'
              >
                <div className='max-w-[44px] min-w-[44px] h-[44px] rounded-full overflow-hidden'>
                  <img
                    className='w-full h-full object-cover'
                    src={el?.icon}
                    alt='*'
                  />
                </div>
                <div className='pl-3 w-full'>
                  <div className='flex justify-between items-center'>
                    <h5 className='text-sm break-all line-clamp-1 pr-1'>
                      {el?.title}
                    </h5>
                    <span className='text-xs text-colGray'>13.00</span>
                  </div>
                  <p className='text-sm text-colGray break-all line-clamp-1 mt-[2px]'>
                    {el?.text}
                  </p>
                </div>
              </NavLink>
            ))}
          </div>
          <div>
            <Outlet />
          </div>
        </div>
      ) : (
        <div className='flex justify-center items-center w-full'>
          <div>
            <img className='mx-auto' src={noNotifications} alt='*' />
            <h4 className='text-2xl font-semibold py-12'>
              У вас еще нет уведомлений
            </h4>
            <NavLink
              to='/'
              className='max-w-[255px] mx-auto w-full flex justify-center items-center bg-black h-[48px] font-medium text-white rounded-[10px] hover:opacity-80 duration-150'
              type='submit'
            >
              Перейти на главную
            </NavLink>
          </div>
        </div>
      )}
    </>
  );
};

export default Notifications;
