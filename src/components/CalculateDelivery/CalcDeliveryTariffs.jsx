import rightArrow from './../../assets/images/right-arrow.png';
import vector from './../../assets/icons/vector.svg';
import { tariffsData } from '../../constants/tariffsData';
import { useState } from 'react';

const CalcDeliveryTariffs = ({ parcelCost, onHandleGetTariff }) => {
  const [activeTariff, setActiveTariff] = useState(null);

  const handleTariffClick = (id) => {
    setActiveTariff(id);
    onHandleGetTariff(id);
  };

  return (
    <div className='w-[66%] shadow-[0_8px_34px_#00000026] p-7 rounded-xl mr-10'>
      <h3 className='text-xl text-[#6747e5] pb-1 font-medium'>Выбор тарифа</h3>
      <p className='mb-3 text-xs'>
        Выберите тариф <span className='text-red-500'>*</span>
      </p>
      <div className='grid grid-cols-2 gap-5'>
        {tariffsData.map((el) => (
          <div
            key={el.id}
            onClick={() => handleTariffClick(el?.id)}
            className={`border-4 ${
              activeTariff === el?.id ? 'border-colYellow' : 'border-gray-200'
            } p-4 rounded-xl cursor-pointer`}
          >
            <div className='flex justify-between items-center'>
              <h3 className='font-medium text-lg'>{el?.name}</h3>
              <span className='text-sm text-red-500 bg-orange-200 rounded-md px-2'>
                {el?.status}
              </span>
            </div>
            <div className='flex items-center py-5'>
              <span className='text-sm'>Пункт приёма GB</span>
              <img
                src={rightArrow}
                className='w-5 h-5 rotate-90 mx-2'
                alt='*'
              />
              <span className='text-sm'>{el?.deliveryPoint}</span>
            </div>
            <p className='font-medium'>От 12 рабочих дней</p>
            <div className='flex justify-end items-center my-3'>
              <div className='w-6 h-6 rounded-full bg-purple-200 border border-white -mr-3 flex justify-center items-center'>
                <img className='w-4' src={el?.img} alt='*' />
              </div>
              <div className='w-6 h-6 rounded-full bg-purple-200 border border-white flex justify-center items-center mr-2'>
                <img className='w-4' src={el?.img} alt='*' />
              </div>
              <img src={vector} alt='*' />
            </div>
            <div className='bg-[#6747e5] text-white p-2 rounded-md text-center text-lg font-bold'>
              {el?.status === 'Быстро'
                ? (parseFloat(parcelCost) + 4).toFixed(2)
                : parcelCost}
              $
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalcDeliveryTariffs;
