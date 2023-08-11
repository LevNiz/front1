import { NavLink } from 'react-router-dom';
import wareHouseIcon from './../../assets/images/warehouse-icon.jpg';
import wareHouseIcon2 from './../../assets/icons/wareHouseIcon2.svg';

const WareHouseItem = (warehouses) => {
  return (
    <>
      {warehouses?.data?.map((el, index) => (
        <NavLink
          to={`${el?.id}`}
          key={index}
          className='shadow-[0px_10px_20px_2px_rgba(204,_204,_204,_0.40)] relative hover:shadow-[0px_10px_20px_10px_rgba(204,_204,_204,_0.40)] duration-150 md:flex-row flex-col flex md:justify-between md:items-center p-4 md:p-6 lg:p-10 my-5 md:my-10 rounded-2xl'
        >
          <div className='lg:w-[107px] w-16 lg:h-107px hidden md:block overflow-hidden'>
            <img
              className='w-full h-full object-cover'
              src={el?.icon}
              alt='*'
            />
          </div>
          <div className='md:min-h-[128px]'>
            <h4 className='hidden md:block text-lg lg:text-2xl font-medium text-colGray mb-3 lg:mb-8 md:text-center'>
              Склад:
            </h4>
            <p className='text-base lg:text-2xl md:text-center font-medium text-black'>{el?.name}</p>
          </div>
          <div className='flex md:block max-w-[275px] w-full md:min-h-[128px] my-2 md:my-0'>
            <h4 className='text-xs md:text-xl lg:text-2xl font-semibold md:font-medium md:text-colGray md:mb-3 lg:mb-8 md:text-center'>
              Адрес:
            </h4>
            <p className='text-xs md:text-base lg:text-2xl md:text-center ml-2 md:ml-0 md:font-medium text-black'>{`${el?.country}, ${el?.city}, ${el?.street}`}</p>
          </div>
          <div className='flex md:block md:min-h-[128px]'>
            <h4 className='text-xs md:text-xl lg:text-2xl font-semibold md:font-medium md:text-colGray md:mb-3 lg:mb-8 md:text-center'>
              Режим работы:
            </h4>
            <p className='text-xs md:text-base lg:text-2xl md:text-center ml-2 md:ml-0 md:font-medium text-black'>{el?.workTime}</p>
          </div>
          <div className='md:h-[150px] lg:h-[192px] hidden md:flex justify-end items-end'>
            <img className='w-6 md:w-10' src={wareHouseIcon} alt='*' />
          </div>
          <img src={wareHouseIcon2} className='md:hidden absolute bottom-[10px] right-[10px] w-[25px]' alt="*" />
        </NavLink>
      ))}
    </>
  );
};

export default WareHouseItem;
