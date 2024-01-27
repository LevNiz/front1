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
  const { register } = useForm();
  const currency = 89.33;

  useEffect(() => {
    const calculateTotalQuantity = () => {
      const total = cartItems?.reduce((acc, item) => {
        if (item?.memory !== '' && item?.memory !== null) {
          return acc + item?.memory?.addCost * item.quantity;
        } else {
          if (item?.item?.issale) {
            return acc + item?.item?.costSale * item.quantity;
          } else {
            return acc + item?.item?.cost * item.quantity;
          }
        }
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
          <div className='hidden ld:flex justify-between items-center pt-10'>
            <span className='font-medium text-lg w-[35%]'>Товар</span>
            <span className='font-medium text-lg w-[15%]'>Цена</span>
            <span className='font-medium text-lg w-[20%] lg:w-[28%]'>
              Количество
            </span>
            <span className='font-medium text-lg w-[15%]'>Итого</span>
          </div>
          <div>
            {cartItems?.map((el, index) => (
              <BasketItem key={index} el={el} />
            ))}

            <form className='max-w-sm pt-10 ml-auto'>
              <div className='flex justify-between pb-5'>
                <span className='font-medium'>Итого</span>
                <span className='text-xl font-bold'>
                  $ {totalCost?.toFixed(1)}{' '}
                  <p className='text-sm font-medium'>
                    ({(totalCost * currency)?.toFixed(1)} с)
                  </p>
                </span>
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
              <button
                type='submit'
                onClick={() => {
                  navigate('/gb-shop/order', { state: totalCost });
                }}
                className='hover:opacity-80 mt-10 font-medium p-3 rounded-lg bg-black text-white duration-150 w-full'
              >
                Оформить заявку
              </button>
            </form>
          </div>
        </>
      ) : (
        <div className='flex justify-center items-center min-h-[480px]'>
          <GBShopEmpty
            title='Ваша корзина пуста.'
            desc='Выберите товары в разделе GB-Shop.'
          />
        </div>
      )}
    </>
  );
};

export default BasketInfo;
