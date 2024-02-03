import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { fetchCurrency, payForWallet } from '../../../api/wallet';
import { ContentLoading } from '../../../helpers/Loader/Loader';
import { useLocation } from 'react-router-dom';

const TopUpWallet = () => {
  const [currency, setCurrency] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { state } = useLocation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: 'onChange' });
  const amount = watch('amount');

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const { success, data } = await fetchCurrency();
      if (success) {
        setCurrency(data);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    })();
  }, []);

  const onSubmit = (data) => {
    payForWallet(data.amount, state?.user, currency);
  };

  return (
    <div className='pt-6 md:p-4 w-full'>
      <h3 className='font-medium text-xl'>Пополнить баланс</h3>
      {isLoading ? (
        <ContentLoading extraStyle='380px' />
      ) : (
        <div className='h-full pt-4 lg:flex items-start'>
          <form
            className='mm:max-w-xs w-full'
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <p className='mb-2 text-sm'>Введите сумму пополнения (c)</p>
              <input
                className='w-full border border-colGray2 p-3 rounded-md focus:border-black focus:outline-none'
                placeholder='Введите сумму'
                type='number'
                pattern='^[0-9]*[.,]?[0-9]+$'
                onKeyDown={(e) => {
                  if (
                    e.key === '-' ||
                    e.key === 'e' ||
                    e.key === '.' ||
                    e.key === ','
                  ) {
                    e.preventDefault();
                  }
                }}
                {...register('amount', {
                  required: 'Введите сумму пополнения!',
                  validate: (value) =>
                    parseFloat(value) >= 10 || 'Минимальная сумма 10',
                  pattern: {
                    value: /^[0-9]*[.,]?[0-9]+$/,
                    message: 'Введите положительное число!',
                  },
                })}
              />
              {errors?.amount && (
                <p className='text-red-500 mt-1 text-sm'>
                  {errors?.amount?.message || 'Error!'}
                </p>
              )}
            </div>
            <button className='hover:opacity-80 font-medium px-4 h-12 text-lg rounded-lg text-white bg-black duration-150 mt-4 w-full'>
              Оплатить
            </button>
          </form>
          <div className='shadow-md w-full p-3 mm:p-5 rounded-lg mt-5 lg:mt-0 lg:ml-8 space-y-3'>
            <p className='font-medium'>Эквиваленты в валютах</p>
            {currency?.map((el) => (
              <div
                key={el?.id}
                className='flex justify-between items-center bg-slate-100 rounded-lg p-3 mm:p-4'
              >
                <div className='flex items-center'>
                  <span className='text-red-500 font-medium'>
                    {amount ? amount : '0.0'}
                  </span>
                  <span className='text-red-500 font-medium pl-1 underline'>
                    C
                  </span>
                </div>
                <div className='flex items-center'>
                  <span className='font-medium'>
                    {amount ? (amount * el?.oneGBIn).toFixed(1) : '0.0'}
                  </span>
                  <span className='font-medium pl-1'>{el?.currency}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TopUpWallet;
