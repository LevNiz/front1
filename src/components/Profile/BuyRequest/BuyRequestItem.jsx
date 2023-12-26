import { NavLink } from 'react-router-dom';
import { buyRequestStatus } from '../../../constants/statusData';

const BuyRequestItem = ({ data = {} }) => {
  return (
    <>
      <NavLink
        to={`${data?.id}`}
        className='shadow-[0_4px_16px_#e9e9e9] p-2 sm:p-5 rounded-xl'
      >
        <div className='w-full mb-3'>
          <h4 className='font-medium break-all line-clamp-1 pr-2'>
            {data?.name || 'Не указана'}
          </h4>
          <div className='flex items-center'>
            <span className='text-sm my-1 pr-1'>Ссылка:</span>
            <span className='text-sm text-blue-500 break-all line-clamp-1'>
              {data?.cart_request[0]?.link || 'Не указана'}
            </span>
          </div>
          <div className='flex'>
            <span className='text-sm mb-1 pr-1'>Комментарий:</span>
            <p className='text-sm break-all line-clamp-1 italic'>
              {data?.cart_request[0]?.comment || 'Не указана'}
            </p>
          </div>
        </div>
        <div className='flex justify-between items-end'>
          <div
            className={`w-max px-3 py-1 text-center text-[10px] rounded-lg ${
              buyRequestStatus[data?.status].statusStyle
            }`}
          >
            {buyRequestStatus[data?.status].name || 'Не указан'}
          </div>
          <p className='text-xs text-colGray font-medium mt-1'>
            {data?.dateCreated?.split('T')[0] || 'Не указана'}
          </p>
        </div>
      </NavLink>
    </>
  );
};

export default BuyRequestItem;
