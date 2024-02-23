import { NavLink } from 'react-router-dom';
import { parcelStatus } from '../../../constants/statusData';
import location from './../../../assets/icons/location3.svg';

const ParcelItem = ({ parcel }) => {
  return (
    <NavLink
      to={`/tracking/${parcel?.id}`}
      className='flex justify-between md:items-center bg-colBgGray2 my-4 p-4 lg:p-8 rounded-lg'
    >
      <div className='md:flex items-center md:space-x-4 w-full'>
        <div className='flex max-w-[250px] w-full'>
          <div className='lg:w-6 min-w-[20px] min-h-[20px] h-[20px] lg:h-6 rounded-full mr-2 border-[3px] border-colYellow flex justify-center items-center'>
            <div className='w-3 h-3 rounded-full bg-colYellow'></div>
          </div>
          <div>
            <h4 className='text-sm font-medium'>
              {parcel?.senderCity?.nameRu}, {parcel?.senderCountry?.nameRu}
            </h4>
            <p className='text-xs text-colGray font-medium mt-1'>
              {parcel?.dateCreated?.split('T')[0]}
            </p>
          </div>
        </div>
        <div className='rotate-90 md:rotate-0 text-xs text-colGray flex font-medium mt-1 w-[40px] md:h-auto h-[35px] items-end md:items-start min-w-[40px] max-w-[100px] md:w-full md:justify-center xl:justify-start'>
          -------
        </div>
        <div className='flex max-w-[250px] w-full'>
          <div className='mr-2'>
            <img className='min-w-[20px]' src={location} alt='*' />
          </div>
          <div>
            <h4 className='text-sm font-medium'>
              {parcel?.receiverCity?.nameRu}, {parcel?.receiverCountry?.nameRu}
            </h4>
            <p className='text-xs text-colGray font-medium mt-1'>
              {parcel?.dateArrived}
            </p>
          </div>
        </div>
      </div>
      <div>
        <div
          className={`lg:p-[10px] py-1 p-2 ml-3 text-center min-w-[70px] sm:min-w-[90px] lg:min-w-[120px] cursor-pointer text-[8px] sm:text-xs rounded-[50px] ${
            parcelStatus[parcel?.status]?.statusStyle
          }`}
        >
          {parcelStatus[parcel?.status]?.name || 'Не указан'}
        </div>
      </div>
    </NavLink>
  );
};

export default ParcelItem;
