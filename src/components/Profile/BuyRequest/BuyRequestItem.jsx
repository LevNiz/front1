import { NavLink } from 'react-router-dom';
import arrow from '../../../assets/icons/arrow-left.svg';

const BuyRequestItem = ({ buyRequest }) => {
  return (
    <div className='py-8 grid grid-cols-2 gap-5'>
      <NavLink className='bg-colBgGray2 p-4 rounded-lg border border-gray-300'>
        <div className='w-full mb-3'>
          <div className='flex justify-between items-center'>
            <h4 className='font-medium break-all line-clamp-1 pr-2'>
              Баланча Баланчаев
            </h4>
            <p className='text-xs text-colGray font-medium mt-1'>12.10.23</p>
          </div>
          <div className='flex items-center'>
            <span className='text-sm my-1 pr-1'>Ссылка:</span>
            <NavLink to='' className='text-blue-500 break-all line-clamp-1'>
              https://www.google.com
            </NavLink>
          </div>
        </div>
        <div className='flex justify-between items-center'>
          <div className='w-max px-3 py-1 text-center cursor-pointer text-[8px] sm:text-[10px] rounded-lg bg-colPurple2'>
            {buyRequest?.status == 'done'
              ? 'Готово'
              : buyRequest?.status == 'on_way'
              ? 'В пути'
              : buyRequest?.status == 'arrived'
              ? 'Получено'
              : buyRequest?.status == 'created'
              ? 'Создан'
              : 'Не указано'}
          </div>
          <img className='rotate-180' src={arrow} alt='*' />
        </div>
      </NavLink>
    </div>
  );
};

export default BuyRequestItem;
