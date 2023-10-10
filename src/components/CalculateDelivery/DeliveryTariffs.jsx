import rightArrow from './../../assets/images/right-arrow.png';
import vector from './../../assets/icons/vector.svg';
import truck from './../../assets/icons/truck.svg';
import building from './../../assets/icons/buildings.svg';

const DeliveryTariffs = ({ parcelCost }) => {
    
  return (
    <div className='flex mt-10'>
      <div className='w-[66%] shadow-[0_8px_34px_#00000026] p-7 rounded-xl mr-10'>
        <h3 className='text-xl text-[#6747e5] pb-3 font-medium'>Тарифы</h3>
        <div className='grid grid-cols-2 gap-5'>
          <div className='border-4 border-colYellow p-4 rounded-xl cursor-pointer'>
            <div className='flex justify-between items-center'>
              <h3 className='font-medium text-lg'>Стандартный</h3>
              <span className='text-sm text-red-500 bg-orange-200 rounded-md px-2'>
                Выгодно
              </span>
            </div>
            <div className='flex items-center py-5'>
              <span className='text-sm'>Пункт приёма GB</span>
              <img
                src={rightArrow}
                className='w-5 h-5 rotate-90 mx-2'
                alt='*'
              />
              <span className='text-sm'>Пункт выдачи GB</span>
            </div>
            <p className='font-medium'>От 12 рабочих дней</p>
            <div className='flex justify-end items-center my-3'>
              <div className='w-6 h-6 rounded-full bg-purple-200 border border-white -mr-3 flex justify-center items-center'>
                <img className='w-4' src={building} alt='*' />
              </div>
              <div className='w-6 h-6 rounded-full bg-purple-200 border border-white flex justify-center items-center mr-2'>
                <img className='w-4' src={building} alt='*' />
              </div>
              <img src={vector} alt='*' />
            </div>
            <div className='bg-[#6747e5] text-white p-2 rounded-md text-center text-lg font-bold'>
              {parcelCost} $
            </div>
          </div>
          <div className='border-4 border-gray-200 p-4 rounded-xl cursor-pointer'>
            <div className='flex justify-between items-center'>
              <h3 className='font-medium text-lg'>Стандартный</h3>
              <span className='text-sm text-red-500 bg-orange-200 rounded-md px-2'>
                Быстро
              </span>
            </div>
            <div className='flex items-center py-5'>
              <span className='text-sm'>Пункт приёма GB</span>
              <img
                src={rightArrow}
                className='w-5 h-5 rotate-90 mx-2'
                alt='*'
              />
              <span className='text-sm'>Пункт выдачи GB</span>
            </div>
            <p className='font-medium'>От 12 рабочих дней</p>
            <div className='flex justify-end items-center my-3'>
              <div className='w-6 h-6 rounded-full bg-purple-200 border border-white -mr-3 flex justify-center items-center'>
                <img className='w-4' src={truck} alt='*' />
              </div>
              <div className='w-6 h-6 rounded-full bg-purple-200 border border-white flex justify-center items-center mr-2'>
                <img className='w-4' src={truck} alt='*' />
              </div>
              <img src={vector} alt='*' />
            </div>
            <div className='bg-[#6747e5] text-white p-2 rounded-md text-center text-lg font-bold'>
              {parcelCost} $
            </div>
          </div>
        </div>
      </div>
      <div className='w-[33%] shadow-[0_8px_34px_#00000026] p-7 rounded-xl'>
        2
      </div>
    </div>
  );
};

export default DeliveryTariffs;
