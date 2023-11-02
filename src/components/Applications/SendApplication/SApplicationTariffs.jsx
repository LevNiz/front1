import { useState } from 'react';
import rightArrow from '../../../assets/images/right-arrow.png';
import vector from '../../../assets/icons/vector.svg';
import { tariffsData } from '../../../constants/tariffsData';
import { addedCost } from '../../../constants/tariffsData';

const SApplicationTariffs = ({
  state,
  parcelCost,
  onHandleTariff,
  onChoseTariff,
}) => {
  const choseTariff = tariffsData?.filter(
    (tariff) => tariff?.id === state?.tariff
  );

  const [activeTariff, setActiveTariff] = useState(choseTariff[0]?.id);

  const handleTariffClick = (id) => {
    setActiveTariff(id);
  };

  return (
    <div className='md:pl-5 lg:pl-10'>
      <p className='mb-3 text-xs'>
        Выберите тариф <span className='text-red-500'>*</span>
      </p>
      <div className='lg:max-w-[768px] grid md:grid-cols-2 gap-5'>
        {tariffsData.map((el) => (
          <div
            key={el.id}
            onClick={() => {
              handleTariffClick(el?.id);
              onHandleTariff(el?.id);
              onChoseTariff(true);
            }}
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
              {parcelCost
                ? el?.status === 'Быстро'
                  ? `${(parseFloat(parcelCost) + addedCost)?.toFixed(2)} $`
                  : `${parseFloat(parcelCost).toFixed(2)} $`
                : '00.00 $'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SApplicationTariffs;
