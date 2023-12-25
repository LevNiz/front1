import noImg from '../../../assets/images/no-image.jpeg';
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
          <div className='flex items-center justify-between pb-2'>
            <p className='text-sm font-medium'>Товары</p>
            <span
              className={`${
                el?.active ? 'text-green-500' : 'text-red-500'
              } rounded-md text-xs font-medium`}
            >
              {el?.active ? 'Активный' : 'Неактивный'}
            </span>
          </div>
          <div className='grid grid-cols-4 gap-2 mt-2'>
            {el?.wantedItems?.slice(0, 4)?.map((elem) => (
              <div
                key={elem?.id}
                className='h-16 ss:h-20 overflow-hidden rounded-md bg-gray-100'
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
