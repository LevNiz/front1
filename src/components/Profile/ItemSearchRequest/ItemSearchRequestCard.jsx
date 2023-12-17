import noImg from '../../../assets/images/no-image.jpeg';
import noAva from '../../../assets/images/no-ava.jpeg';
import { NavLink } from 'react-router-dom';

const ItemSearchRequestCard = ({ el }) => {
  return (
    <>
      <NavLink
        to={`${el?.id}`}
        className='shadow-[0_4px_16px_#e9e9e9] p-3 sm:p-4 rounded-md cursor-pointer'
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
          <div className='grid grid-cols-4 gap-4 mt-2'>
            {el?.wantedItems?.slice(0, 4)?.map((elem) => (
              <div
                key={elem?.id}
                className='min-w-[80px] w-20 ss:min-w-[96px] ss:w-24 h-16 ss:h-20 overflow-hidden rounded-md bg-gray-100'
              >
                <img
                  className='w-full h-full object-cover'
                  src={elem?.photo}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = noImg;
                  }}
                  alt='*'
                />
              </div>
            ))}
          </div>
        </div>
      </NavLink>
    </>
  );
};

export default ItemSearchRequestCard;
