import { BasketInfo } from '../../../components';

const Basket = () => {
  return (
    <div className='py-24 min-h-[991px] content'>
      <h3 className='font-bold font-ubuntu px-5 py-3 text-[#030303] text-3xl bg-[#FBFBFB]'>
        Корзина
      </h3>
      <div className='flex justify-between items-center pt-10'>
        <span className='font-medium text-lg w-[28%]'>Товар</span>
        <span className='font-medium text-lg w-[22%]'>Цена</span>
        <span className='font-medium text-lg w-[28%]'>Количество</span>
        <span className='font-medium text-lg w-[15%]'>Итого</span>
      </div>
      <BasketInfo />
    </div>
  );
};

export default Basket;
