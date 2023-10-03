import { NavLink } from 'react-router-dom';
import time from './../../assets/icons/time.svg';
import local from './../../assets/icons/location-outline.svg';
import noImg from './../../assets/images/no-image.svg';

const DepotItem = ({ el }) => {
  return (
    <>
      <NavLink
        to={`${el?.id}`}
        className='shadow-[0px_10px_20px_2px_rgba(204,_204,_204,_0.40)] relative hover:shadow-[0px_10px_20px_10px_rgba(204,_204,_204,_0.40)] duration-150 overflow-hidden rounded-lg sm:rounded-2xl my-2 ss:my-0'
      >
        <div className='h-[220px] ss:h-[160px] sm:h-[220px] lg:h-[280px] overflow-hidden bg-colBgGray'>
          <img
            className='w-full h-full object-cover'
            src={el?.images?.length ? el?.images[0] : noImg}
            alt='*'
          />
        </div>
        <div className='p-3 lg:p-4 relative'>
          <div className='absolute -top-3 md:-top-6 right-2 md:right-5 w-6 md:w-12 h-6 md:h-12 rounded-full overflow-hidden'>
            <img
              className='w-full h-full object-cover'
              src={el?.country?.icon}
              alt='*'
            />
          </div>
          <h3 className='sm:text-lg lg:text-xl font-medium text-black line-clamp-1 break-all'>
            {el?.nameRu || 'Не указан'}
          </h3>
          <div className='flex items-center mt-2 mm:mt-3 mb-1 mm:mb-2'>
            <img
              className='w-4 min-w-[16px] mm:w-5 mm:min-w-[20px] md:w-6 md:min-w-[24px]'
              src={time}
              alt='*'
            />
            <p className='text-sm mm:text-lg text-colGray ml-2 md:ml-3 line-clamp-1 break-all'>
              {el?.workingHours[0]?.mondayStart} -{' '}
              {el?.workingHours[0]?.mondayEnd}
            </p>
          </div>
          <div className='flex items-center'>
            <img
              className='w-4 min-w-[16px] mm:w-5 mm:min-w-[20px] md:w-6 md:min-w-[24px]'
              src={local}
              alt='*'
            />
            <p className='text-sm mm:text-lg text-colGray ml-2 md:ml-3 line-clamp-1 break-all'>
              {el?.address ? el?.address : 'Не указан'}
            </p>
          </div>
        </div>
      </NavLink>
    </>
  );
};

export default DepotItem;
