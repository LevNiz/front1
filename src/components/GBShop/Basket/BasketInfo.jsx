import { useForm } from 'react-hook-form';
import BasketItem from './BasketItem';
import GBShopEmpty from '../../../helpers/Errors/GBSHopEmpty';
import { useSelector } from 'react-redux';
import { ContentLoading } from '../../../helpers/Loader/Loader';
import { useNavigate } from 'react-router-dom';
import { ErrorServer } from '../../../helpers/Errors/ErrorServer';
import { useEffect, useState } from 'react';

const BasketInfo = () => {
  const [totalCost, setTotalCost] = useState(0);
  const navigate = useNavigate();
  const { cartItems, loading, error } = useSelector(
    (state) => state?.cartItems
  );
  const { register, watch } = useForm();
  const checkboxInput = watch('checkboxInput');

  useEffect(() => {
    const calculateTotalQuantity = () => {
      const total = cartItems?.reduce((acc, item) => {
        return acc + item?.item?.cost * item.quantity;
      }, 0);
      setTotalCost(total);
    };

    calculateTotalQuantity();
  }, [cartItems]);

  return (
    <>
      {loading ? (
        <div className='flex justify-center items-center min-h-[480px]'>
          <ContentLoading />
        </div>
      ) : error ? (
        <ErrorServer />
      ) : cartItems?.length ? (
        <>
          <div className='flex justify-between items-center pt-10'>
            <span className='font-medium text-lg w-[35%]'>Товар</span>
            <span className='font-medium text-lg w-[15%]'>Цена</span>
            <span className='font-medium text-lg w-[28%]'>Количество</span>
            <span className='font-medium text-lg w-[15%]'>Итого</span>
          </div>
          <div>
            {cartItems?.map((el, index) => (
              <BasketItem key={index} el={el} />
            ))}

            <form className='max-w-[420px] pt-10 ml-auto'>
              <div className='flex items-center justify-between pb-5'>
                <span className='font-medium'>Итого</span>
                <span className='text-xl font-bold'>$ {totalCost}</span>
              </div>
              <input
                className='hidden'
                type='checkbox'
                id='checkbox'
                {...register('checkboxInput', {
                  required:
                    'Обязательное согласие с политикой конфиденциальности!',
                })}
              />
              <label
                htmlFor='checkbox'
                className='text-sm flex cursor-pointer mm:items-center'
              >
                <div className='w-7 h-7 min-w-[28px] min-h-[28px] mr-2 flex justify-center items-center bg-colYellow border border-white rounded'>
                  {checkboxInput && (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      xmlnsXlink='http://www.w3.org/1999/xlink'
                      width='20'
                      height='20'
                      viewBox='0 0 30 30.000001'
                      version='1.0'
                    >
                      <defs>
                        <clipPath id='id1'>
                          <path d='M 2.328125 4.222656 L 27.734375 4.222656 L 27.734375 24.542969 L 2.328125 24.542969 Z M 2.328125 4.222656 ' />
                        </clipPath>
                      </defs>
                      <g clipPath='url(#id1)'>
                        <path
                          fill='#fff'
                          d='M 27.5 7.53125 L 24.464844 4.542969 C 24.15625 4.238281 23.65625 4.238281 23.347656 4.542969 L 11.035156 16.667969 L 6.824219 12.523438 C 6.527344 12.230469 6 12.230469 5.703125 12.523438 L 2.640625 15.539062 C 2.332031 15.84375 2.332031 16.335938 2.640625 16.640625 L 10.445312 24.324219 C 10.59375 24.472656 10.796875 24.554688 11.007812 24.554688 C 11.214844 24.554688 11.417969 24.472656 11.566406 24.324219 L 27.5 8.632812 C 27.648438 8.488281 27.734375 8.289062 27.734375 8.082031 C 27.734375 7.875 27.648438 7.679688 27.5 7.53125 Z M 27.5 7.53125 '
                          fillOpacity='1'
                          fillRule='nonzero'
                        />
                      </g>
                    </svg>
                  )}
                </div>
                <p>
                  <span className='ml-1 text-[#5a5959]'>
                    Согласен(на) получить уведомления об акциях
                  </span>
                </p>
              </label>
              <button
                type='submit'
                disabled={!checkboxInput}
                onClick={() => {
                  navigate('/gb-shop/order', { state: totalCost });
                }}
                className={`${
                  checkboxInput
                    ? 'hover:opacity-80'
                    : 'cursor-not-allowed opacity-60'
                } mt-10 font-medium p-3 rounded-lg bg-black text-white duration-150 w-full`}
              >
                Оформить заявку
              </button>
            </form>
          </div>
        </>
      ) : (
        <div className='flex justify-center items-center min-h-[480px]'>
          <GBShopEmpty
            title='Вы пока не делали покупки'
            desc='Перейдите в раздел GB-Shop для покупки'
          />
        </div>
      )}
    </>
  );
};

export default BasketInfo;
