import nounBox from './../../assets/icons/noun-box.svg';
import parcelCar from './../../assets/images/parcel-car.svg';
import parcelIcon from './../../assets/images/parcel-icon.png';

const Parcel = (parcel) => {
  return (
    <>
      {parcel?.parcel?.map((el, index) => (
        <div
          key={index}
          className='max-w-[712px] my-12 shadow-[0px_15px_30px_0px_rgba(204,_204,_204,_0.40)] rounded-[18px] p-8'
        >
          <div className='flex justify-between items-center'>
            <div className='flex items-center'>
              <img src={nounBox} alt='*' />
              <h4 className='text-2xl font-medium ml-4'>{el?.number}</h4>
            </div>
            <div className='max-w-[140px] w-full min-h-[50px] rounded-[18px] flex justify-center items-center text-xs font-medium bg-colGreen px-4 py-2 break-all'>
              {el?.status}
            </div>
          </div>
          <div className='flex justify-between pt-8'>
            <div className='max-w-[33%] break-all'>
              <span className='text-colGray2 text-[18ox]'>Отправитель</span>
              <h4 className='text-xl font-medium mt-2'>{el?.sender}</h4>
            </div>
            <div className='max-w-[33%] break-all'>
              <span className='text-colGray2 text-[18px]'>Дата доставки</span>
              <h4 className='text-xl font-medium mt-2'>{el?.deliveryDate}</h4>
            </div>
            <div className='max-w-[33%] break-all'>
              <span className='text-colGray2 text-[18px]'>Получатель</span>
              <h4 className='text-xl font-medium mt-2'>{el?.reciever}</h4>
            </div>
          </div>
          <div className='flex justify-between items-center mt-8'>
            <div className='flex items-center'>
              <div className='min-h-[23px] min-w-[23px] p-2 rounded-full bg-colYellow'></div>
              <span className='bg-colYellow h-[2px] w-[90px]'></span>
              <div className='min-h-[23px] min-w-[23px] p-2 rounded-full bg-colYellow'>
                <img src={parcelCar} alt='*' />
              </div>
              <span className='bg-black h-[2px] w-[90px]'></span>
              <div className='min-h-[23px] min-w-[23px] p-2 rounded-full bg-black'></div>
              <span className='bg-black h-[2px] w-[90px]'></span>
              <div className='min-h-[23px] min-w-[23px] p-2 rounded-full bg-black'></div>
            </div>
            <div className='w-[45px] h-[45px] overflow-hidden'>
              <img
                className='w-full h-full object-cover'
                src={parcelIcon}
                alt='*'
              />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Parcel;
