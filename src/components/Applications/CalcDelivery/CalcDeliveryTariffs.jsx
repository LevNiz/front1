import { useState } from 'react';
import { tariffsData } from '../../../constants/tariffsData';
import receptionPoint from '../../../assets/icons/receptionPoint.svg';

const CalcDeliveryTariffs = ({ parcelCost, onHandleGetTariff }) => {
  const [activeTariff, setActiveTariff] = useState(null);

  const handleTariffClick = (id) => {
    setActiveTariff(id);
    onHandleGetTariff(id);
  };

  return (
    <div className='lg:w-[66%] md:shadow-[0_8px_34px_#00000026] md:p-7 rounded-xl mb-10 lg:mb-0 lg:mr-10'>
      <h3 className='text-xl text-[#6747e5] pb-1 font-medium'>Выбор тарифа</h3>
      <p className='mb-3 text-xs'>
        Выберите тариф <span className='text-red-500'>*</span>
      </p>
      <div className='grid md:grid-cols-2 gap-5'>
        {tariffsData?.map((el) => (
          <div
            key={el.id}
            className={`${
              activeTariff === el?.id ? 'bg-black text-white' : 'bg-white'
            } p-5 rounded-xl shadow-[0px_10px_20px_0px_rgba(204,_204,_204,_0.40)]`}
          >
            <div className='flex justify-between items-start'>
              <div className='flex items-center'>
                {activeTariff === el?.id ? (
                  <img className='w-6 mr-2' src={el?.statusWhiteImg} alt='*' />
                ) : (
                  <img className='w-6 mr-2' src={el?.statusImg} alt='*' />
                )}
                <h3 className='font-medium text-lg'>{el?.name}</h3>
              </div>
              <span className='text-xs font-medium text-white bg-colPurple rounded-md px-3 py-[2px]'>
                {el?.status}
              </span>
            </div>
            <div className='py-2 text-2xl mm:text-3xl font-bold'>
              {parcelCost
                ? `${parseFloat(parcelCost).toFixed(2)} $`
                : '00.00 $'}
            </div>
            <div className='py-5'>
              <div className='flex items-center'>
                <img className='w-5' src={receptionPoint} alt='*' />
                <p className='text-sm font-medium pl-2'>Пункт приёма GB</p>
              </div>
              {activeTariff === el?.id ? (
                <img
                  src={el?.arrowWhiteImg}
                  alt='*'
                  className='my-2 ml-[2px]'
                />
              ) : (
                <img src={el?.arrowImg} alt='*' className='my-2 ml-[2px]' />
              )}
              <div className='flex items-center'>
                {activeTariff === el?.id ? (
                  <img className='w-5' src={el?.locationWhiteImg} alt='*' />
                ) : (
                  <img className='w-5' src={el?.locationImg} alt='*' />
                )}
                <p className='text-sm font-medium pl-2'>{el?.deliveryPoint}</p>
              </div>
            </div>
            <p className='font-medium'>От 12 рабочих дней</p>
            <div
              onClick={() => {
                handleTariffClick(el?.id);
              }}
              className='rounded-md bg-colYellow p-2 w-full text-center text-black font-medium mt-5 cursor-pointer'
            >
              Выбрать
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalcDeliveryTariffs;
