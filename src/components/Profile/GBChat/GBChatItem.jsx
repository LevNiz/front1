import { NavLink } from 'react-router-dom';

const GBChatSidebar = () => {
  return (
    <div className='flex flex-col space-y-3 scrollable ld:h-[calc(100vh-190px)] ld:overflow-y-scroll ld:pr-3'>
      <NavLink to='12' className='flex items-center'>
        <div className='w-12 sm:w-14 h-12 sm:h-14 min-w-[48px] sm:min-w-[56px] rounded-full overflow-hidden border border-colYellow'>
          <img
            className='w-full h-full object-cover rounded-full p-[2px]'
            src='https://st3.depositphotos.com/3431221/13621/v/450/depositphotos_136216036-stock-illustration-man-avatar-icon-hipster-character.jpg'
            alt='*'
          />
        </div>
        <div className='ml-2'>
          <div className='flex justify-between items-center'>
            <h4 className='font-medium line-clamp-1 break-all'>
              Азат Толкунбеков
            </h4>
            <span className='pl-1 text-xs'>22:00</span>
          </div>
          <p className='text-sm opacity-70 line-clamp-1 break-all'>
            Как прошел сегодняшний день? Чем занимался? Что будешь делать
            завтра?
          </p>
        </div>
      </NavLink>
    </div>
  );
};

export default GBChatSidebar;
