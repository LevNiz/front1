/* eslint-disable react/prop-types */
import { NavLink } from 'react-router-dom';
import time from './../../assets/icons/time.svg';
import local from './../../assets/icons/location-outline.svg';

const DepotItem = ({depotData}) => {
  return (
    <>
      {depotData?.map((el, index) => (
        <NavLink
          to={`${el?.id}`}
          key={index}
          className='shadow-[0px_10px_20px_2px_rgba(204,_204,_204,_0.40)] relative hover:shadow-[0px_10px_20px_10px_rgba(204,_204,_204,_0.40)] duration-150 overflow-hidden rounded-lg sm:rounded-2xl my-2 ss:my-0'
        >
          <div className='h-[220px] ss:h-[160px] sm:h-[220px] lg:h-[280px] overflow-hidden'>
            <img
              className='w-full h-full object-cover'
              src={el?.images[0]}
              alt='*'
            />
          </div>
          <div className='p-3 lg:p-4'>
            <h3 className='sm:text-lg lg:text-xl font-medium text-black line-clamp-1 break-all'>
              {el?.nameRu || 'Не указан'}
            </h3>
            <div className="flex items-center mt-2 mm:mt-3 mb-1 mm:mb-2">
              <img className='w-4 min-w-[16px] mm:w-5 mm:min-w-[20px] md:w-6 md:min-w-[24px]' src={time} alt="*" />
              <p className='text-sm mm:text-lg text-colGray ml-2 md:ml-3 line-clamp-1 break-all'>08:00 - 18:00</p>
            </div>
            <div className="flex items-center">
              <img className='w-4 min-w-[16px] mm:w-5 mm:min-w-[20px] md:w-6 md:min-w-[24px]' src={local} alt="*" />
              <p className='text-sm mm:text-lg text-colGray ml-2 md:ml-3 line-clamp-1 break-all'>{el?.address ? el?.address : 'Не указан'}</p>
            </div>
          </div>
          
        </NavLink>
      ))}
    </>
  );
};

export default DepotItem;
