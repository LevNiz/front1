import { NavLink, Outlet } from 'react-router-dom';
import { notifications } from '../../../constants/notificationsData';

const Notifications = () => {
  return (
    <div className='content py-4 grid grid-cols-2 gap-5'>
      <div className='px-8'>
        <div className='flex justify-between items-center pb-5'>
          <div className='flex items-center'>
            <span className='font-medium'>Недавние</span>
            <span className='bg-red-500 text-white min-w-[16px] h-[16px] text-[10px] rounded-full text-center ml-2 mb-1'>
              4
            </span>
          </div>
          <div className='text-sm text-red-500 cursor-pointer'>Удалить все</div>
        </div>
        {notifications?.map((el, index) => (
          <NavLink
            to={`${el.id}`}
            key={index}
            className='flex my-3 border-b sidebar border-colBgGray2 pb-3 hover:bg-colBgGray2 p-3 rounded-md'
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
  );
};

export default Notifications;
