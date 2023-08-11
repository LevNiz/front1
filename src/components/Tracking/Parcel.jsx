import { NavLink } from 'react-router-dom';
import nounBox from './../../assets/icons/noun-box.svg';
import parcelCar from './../../assets/images/parcel-car.svg';
import parcelIcon from './../../assets/images/parcel-icon.png';

const Parcel = (parcel) => {
  console.log(parcel.parcel)
  return (
    <>
      {parcel?.parcel?.map((el, index) => (
        <NavLink
          to={`${el?.id}`}
          key={index}
          className='max-w-[712px] mx-auto w-full shadow-[0px_15px_30px_0px_rgba(204,_204,_204,_0.40)] hover:shadow-[0px_20px_30px_0px_rgba(204,_204,_204,_0.90)] duration-150 rounded-[18px] p-4 md:p-8'
        >
          <div className='flex justify-between items-center'>
            <div className='flex items-center'>
              <img className='lg:block hidden' src={nounBox} alt='*' />
              <h4 className='text-lg md:text-2xl font-medium lg:ml-4'>{el?.number}</h4>
            </div>
            <div className='sm:max-w-[140px] sm:w-full md:min-h-[50px] rounded-xl md:rounded-[18px] flex justify-center items-center text-xs font-medium bg-colGreen px-4 py-2 break-all'>
              {el?.status}
            </div>
          </div>
          <div className='flex justify-between pt-8'>
            <div className='max-w-[33%] break-all'>
              <span className='text-colGray2 text-xs sm:text-sm md:text-lg'>Отправитель</span>
              <h4 className='text-xs sm:text-base md:text-xl font-medium mt-2'>{el?.sender}</h4>
            </div>
            <div className='max-w-[33%] break-all'>
              <span className='text-colGray2 text-xs sm:text-sm md:text-lg'>Дата доставки</span>
              <h4 className='text-xs sm:text-base md:text-xl font-medium mt-2'>{el?.deliveryDate}</h4>
            </div>
            <div className='max-w-[33%] break-all'>
              <span className='text-colGray2 text-xs sm:text-sm md:text-lg'>Получатель</span>
              <h4 className='text-xs sm:text-base md:text-xl font-medium mt-2'>{el?.reciever}</h4>
            </div>
          </div>
          <div className='md:flex justify-between items-center mt-8'>
            <div className='flex items-center'>
              <div className='sm:min-h-[23px] min-h-[18px] min-w-[18px] sm:min-w-[23px] p-2 rounded-full bg-colYellow'></div>
              <span className='bg-colYellow h-[2px] w-full md:w-[90px]'></span>
              <div className='p-2 rounded-full bg-colYellow'>
                <img className='min-w-[18px] sm:min-w-[22px]' src={parcelCar} alt='*' />
              </div>
              <span className='bg-black h-[2px] w-full md:w-[90px]'></span>
              <div className='sm:min-h-[23px] min-h-[18px] min-w-[18px] sm:min-w-[23px] p-2 rounded-full bg-black'></div>
              <span className='bg-black h-[2px] w-full md:w-[90px]'></span>
              <div className='sm:min-h-[23px] min-h-[18px] min-w-[18px] sm:min-w-[23px] p-2 rounded-full bg-black'></div>
            </div>
            <div className='sm:w-[45px] w-[25px] mt-3 sm:mt-0 ml-auto h-[25px] sm:h-[45px] overflow-hidden'>
              <img
                className='w-full h-full object-cover'
                src={parcelIcon}
                alt='*'
              />
            </div>
          </div>
        </NavLink>
      ))}
    </>
  );
};

export default Parcel;
