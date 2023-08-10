import location from './../../../assets/icons/location3.svg';

const ParcelItem = (parcel) => {
  const parcels = parcel?.parcel;
  return (
    <div className='py-8'>
      {parcels?.map((el, index) => (
        <div
          key={index}
          className='flex justify-between items-center bg-colBgGray2 p-8 rounded-lg my-6'
        >
          <div className='flex items-center space-x-4 w-full'>
            <div className='w-6 h-6 rounded-full border-[3px] border-colYellow flex justify-center items-center'>
              <div className='w-3 h-3 rounded-full bg-colYellow'></div>
            </div>
            <div className='max-w-[150px] w-full'>
              <h4 className='text-sm font-medium'>
                {el?.city}, {el?.country}
              </h4>
              <p className='text-xs text-colGray font-medium mt-1'>
                {el?.deliveryDate}
              </p>
            </div>
            <div className='text-xs text-colGray font-medium mt-1 max-w-[150px] w-full text-center'>
              ----------
            </div>
            <div>
              <img src={location} alt='*' />
            </div>
            <div>
              <h4 className='text-sm font-medium'>
                {el?.city}, {el?.country}
              </h4>
              <p className='text-xs text-colGray font-medium mt-1'>
                {el?.deliveryDate}
              </p>
            </div>
          </div>
          <div>
            <div className='p-[10px] text-center min-w-[120px] cursor-pointer text-xs rounded-[50px] bg-colPurple2'>
              {el?.status}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ParcelItem;
