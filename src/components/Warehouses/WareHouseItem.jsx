import { NavLink } from 'react-router-dom';
import wareHouseIcon from './../../assets/images/warehouse-icon.jpg';

const WareHouseItem = (warehouses) => {
  return (
    <>
      {warehouses?.data?.map((el, index) => (
        <NavLink
          to={`${el?.id}`}
          key={index}
          className='shadow-[0px_10px_20px_2px_rgba(204,_204,_204,_0.40)] hover:shadow-[0px_10px_20px_10px_rgba(204,_204,_204,_0.40)] duration-150 flex justify-between items-center px-10 space-x-4 py-6 my-10 rounded-2xl'
        >
          <div className='w-[107px] h-107px overflow-hidden'>
            <img
              className='w-full h-full object-cover'
              src={el?.icon}
              alt='*'
            />
          </div>
          <div className='min-h-[128px]'>
            <h4 className='text-2xl font-medium text-colGray mb-8 text-center'>
              Склад
            </h4>
            <p className='text-2xl font-medium text-black'>{el?.name}</p>
          </div>
          <div className='max-w-[275px] w-full min-h-[128px]'>
            <h4 className='text-2xl font-medium text-colGray mb-8 text-center'>
              Адрес
            </h4>
            <p className='text-2xl font-medium text-black'>{`${el?.country}, ${el?.city}, ${el?.street}`}</p>
          </div>
          <div className='min-h-[128px]'>
            <h4 className='text-2xl font-medium text-colGray mb-8 text-center'>
              Режим работы
            </h4>
            <p className='text-2xl font-medium text-black'>{el?.workTime}</p>
          </div>
          <div className='h-[192px] flex justify-end items-end'>
            <img src={wareHouseIcon} alt='*' />
          </div>
        </NavLink>
      ))}
    </>
  );
};

export default WareHouseItem;
