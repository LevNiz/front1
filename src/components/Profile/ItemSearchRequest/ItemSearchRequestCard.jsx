import noImg from '../../../assets/images/no-image.jpeg';
import noAva from '../../../assets/images/no-ava.jpeg';
import { NavLink } from 'react-router-dom';

const ItemSearchRequestCard = ({ el }) => {
  return (
    <>
      <NavLink
        to={`${el?.id}`}
        className='bg-colBgGray2 p-3 sm:p-4 rounded-md cursor-pointer'
      >
        <div className='w-full'>
          {' '}
          <div className='flex justify-between pb-3'>
            <div className='flex items-center'>
              <div className='min-w-[40px] w-10 h-10 rounded-full overflow-hidden border border-gray-400'>
                <img
                  className='w-full h-full object-cover'
                  src={el?.client?.avatar}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = noAva;
                  }}
                  alt='*'
                />
              </div>
              <h4 className='font-medium text-sm ml-3 line-clamp-1 break-all'>
                {el?.name}
              </h4>
            </div>
            <span
              className={`${
                el?.active ? 'text-green-500' : 'text-red-500'
              } mr-2 rounded-md text-xs font-medium`}
            >
              {el?.active ? 'Активный' : 'Неактивный'}
            </span>
          </div>
          <p className='text-sm font-medium'>Товары</p>
          <div className='flex mt-2'>
            <div className='min-w-[80px] w-20 ss:min-w-[96px] ss:w-24 h-16 ss:h-20 overflow-hidden rounded-md bg-white'>
              <img
                className='w-full h-full object-contain'
                src={el?.wantedItems[0]?.photo}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = noImg;
                }}
                alt='*'
              />
            </div>
            <div className='ml-3'>
              <span className='text-xs font-medium opacity-70'>
                Доп. информация:
              </span>
              <p className='line-clamp-2 break-all text-sm'>
                {el?.wantedItems[0]?.description}
              </p>
            </div>
          </div>
        </div>
      </NavLink>
    </>
  );
};

export default ItemSearchRequestCard;
