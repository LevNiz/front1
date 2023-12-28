import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  handleDecreaseQuantity,
  handleIncreaseQuantity,
  removeFromCart,
} from '../../../api/gb-shop/basket';
import { useSelector } from 'react-redux';

const BasketItem = ({ el }) => {
  const { userID } = useSelector((state) => state?.user);
  const [count, setCount] = useState(el?.quantity);

  const handelIncrement = async (itemID) => {
    setCount((prevCount) => prevCount + 1);
    await handleIncreaseQuantity(userID, itemID, count + 1);
  };

  const handelDecrement = async (itemID) => {
    setCount((prevCount) => prevCount - 1);
    await handleDecreaseQuantity(userID, itemID, count - 1);
  };

  return (
    <div className='border-b border-gray-300 border-t py-5 my-5'>
      <div className='flex items-start justify-between space-x-5'>
        <div className='flex w-[35%]'>
          <div className='w-2/5 h-36 rounded-md overflow-hidden bg-gray-100'>
            <img
              className='w-full h-full object-contain'
              src={el?.item?.image}
              alt='*'
            />
          </div>
          <div className='w-3/5 pl-3 flex flex-col justify-between'>
            <NavLink
              to={`/gb-shop/items/${el?.item?.id}`}
              className='font-medium pt-3'
            >
              {el?.item?.name || 'Не указано'}
            </NavLink>
            <span
              onClick={async () => {
                await removeFromCart(userID, el?.item?.id);
              }}
              className='text-[#8A8A8A] border-b border-gray-400 w-max cursor-pointer mb-3'
            >
              Удалить
            </span>
          </div>
        </div>
        <div className='w-[15%]'>
          <span className='font-medium'>$ {el?.item?.cost}</span>
        </div>
        <div className='w-[28%]'>
          <div className='flex pb-5'>
            <div
              onClick={() => handelDecrement(el?.item?.id)}
              className='border rounded-tl-sm rounded-bl-sm border-gray-200 w-10 h-10 flex justify-center items-center font-medium cursor-pointer'
            >
              -
            </div>
            <div className='border border-y-gray-200 border-x-0 min-w-[60px] font-medium px-1 flex justify-center items-center'>
              {count}
            </div>
            <div
              onClick={() => handelIncrement(el?.item?.id)}
              className='border rounded-tr-sm rounded-br-sm border-gray-200 w-10 h-10 flex justify-center items-center font-medium cursor-pointer'
            >
              +
            </div>
          </div>
        </div>
        <div className='w-[15%] font-medium'>$ {el?.item?.cost * count}</div>
      </div>
    </div>
  );
};

export default BasketItem;
