import { useState } from 'react';
import { tariffsData } from '../../../constants/tariffsData';
import receptionPoint from '../../../assets/icons/receptionPoint.svg';
import { currency } from '../../../constants/currency';

const SApplicationTariffs = ({
  state,
  tariffCost,
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
      <p className='mb-3 font-medium'>
        Выберите тариф <span className='text-red-500'>*</span>
      </p>
      <div className='lg:max-w-[680px] grid ld:grid-cols-2 gap-6 md:gap-10 mt-5'>
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
            <div className='py-2 flex items-center'>
              <h3 className='text-2xl mm:text-3xl font-bold whitespace-nowrap'>
                {tariffCost
                  ? `${
                      el?.id === 1
                        ? parseFloat(tariffCost?.standart).toFixed(2)
                        : parseFloat(tariffCost?.premium).toFixed(2)
                    } $`
                  : '00.00 $'}
              </h3>
              <span className='text-sm font-medium pl-1 pt-2 break-all break-words'>
                (
                {tariffCost
                  ? `${
                      el?.id === 1
                        ? parseFloat(tariffCost?.standart).toFixed(2) * currency
                        : parseFloat(tariffCost?.premium).toFixed(2) * currency
                    } с`
                  : '00.00 $'}
                )
              </span>
            </div>
            <p className='text-xs'>
              Для пользователей <br />
              премиум <strong>{tariffCost?.premium} $</strong>{' '}
              <span className='text-[10px]'>
                ({tariffCost?.premium * currency} cом)
              </span>
            </p>
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
                onHandleTariff(el?.id);
                onChoseTariff(true);
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

export default SApplicationTariffs;
