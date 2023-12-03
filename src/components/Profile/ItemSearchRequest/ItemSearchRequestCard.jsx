// import { NavLink } from 'react-router-dom';
import edit from '../../../assets/icons/update.svg';
import trash from '../../../assets/icons/trash.svg';

const ItemSearchRequestCard = ({ el }) => {
  return (
    <>
      <div className='bg-colBgGray2 p-2 sm:p-4 rounded-md'>
        <div className='w-full mb-3'>
          <div className='flex justify-between items-center'>
            <span
              className={`${
                el?.active ? 'bg-colGreen' : 'bg-red-300'
              } mr-2 rounded-md text-xs px-3 py-1`}
            >
              {el?.active ? 'Активный' : 'Неактивный'}
            </span>
            <div className='flex space-x-1'>
              <img
                // onClick={() => navigate(`update/${data?.id}`)}
                className='cursor-pointer min-w-[28px]'
                src={edit}
                alt='*'
              />
              <img
                // onClick={() => {
                //   setModalOpen(true);
                //   setModalContent('deleteBuyRequest');
                //   setBuyRequestID(data?.id);
                // }}
                className='cursor-pointer min-w-[30px]'
                src={trash}
                alt='*'
              />
            </div>
          </div>
          <div className='flex items-center py-3'>
            <div className='min-w-[64px] w-16 h-16 rounded-full overflow-hidden'>
              <img
                className='w-full h-full object-cover'
                src={el?.photo}
                alt='*'
              />
            </div>
            <h4 className='font-medium text-lg ml-3 line-clamp-1 break-all'>
              {el?.client?.fullname}
            </h4>
          </div>
          <p className='text-sm break-all line-clamp-2'>
            {el?.description || 'Не указана'}
          </p>
        </div>
      </div>
    </>
  );
};

export default ItemSearchRequestCard;
