import nounBox from './../../assets/icons/noun-box.svg';
import mapImg from './../../assets/images/map.png';
import sender from './../../assets/icons/sender.svg';
import reciever from './../../assets/icons/reciever.svg';
import cargo from './../../assets/icons/cargo.svg';
import dollar from './../../assets/icons/dollar.svg';
import back from './../../assets/icons/arrow-left.svg';
import { useNavigate } from 'react-router-dom';

const DetailInfo = () => {
  const navigate = useNavigate();
  return (
    <div className='bg-colBgGray2 fixed lg:static w-full h-full overflow-y-scroll top-0 left-0 z-[9999] lg:rounded-[20px] lg:h-[fit-content] p-4 lg:p-7 mlg:l-6 xl:ml-auto lg:w-3/6 xl:w-2/5'>
      <img onClick={() => navigate(-1)} className='mb-4' src={back} alt="*" />
      <div className='flex justify-center items-center mb-5'>
        <img src={nounBox} alt='*' />
        <h2 className='text-2xl font-medium ml-6'>ММ09564738</h2>
      </div>
      <div>
        <img className='mx-auto' src={mapImg} alt='*' />
      </div>
      <div className='bg-white max-w-[420px] lg:max-w-[360px] mx-auto w-full p-10 rounded-[20px] mt-8 lg:mt-0 lg:-top-14 relative flex flex-col justify-between'>
        <div className='flex'>
          <div className='flex flex-col items-center'>
            <div className='w-[33px] h-[33px] bg-[#EFEFEF] rounded-md flex justify-center items-center'>
              <img src={sender} alt='*' />
            </div>
            <div className='w-[2px] h-full bg-colYellow'></div>
          </div>
          <div className='ml-4 pb-10'>
            <h4 className='text-sm font-medium'>Отправитель</h4>
            <p className='text-xs mb-2'>Склад №2</p>
            <p className='text-xs'>Кыргызстан, Бишкек</p>
            <p className='text-xs'>ул. Советская, 123</p>
          </div>
        </div>
        <div className='flex items-center z-10'>
          <div className='flex flex-col items-center'>
            <div className='w-[33px] h-[33px] bg-[#EFEFEF] rounded-md flex justify-center items-center'>
              <img src={cargo} alt='*' />
            </div>
            <div className='w-[2px] h-full bg-colYellow'></div>
          </div>
          <div className='ml-4'>
            <h4 className='text-sm font-medium'>В пути</h4>
          </div>
        </div>
        <div className='flex pt-16'>
          <div className='flex flex-col items-center relative'>
            <div className='w-[2px] h-full bg-colGray2 absolute -top-[100%] z-0'></div>
            <div className='w-[33px] h-[33px] bg-[#EFEFEF] rounded-md flex justify-center items-center'>
              <img src={reciever} alt='*' />
            </div>
          </div>
          <div className='ml-4'>
            <h4 className='text-sm font-medium'>Получатель</h4>
            <p className='text-xs mb-2'>Иван Иванов</p>
            <p className='text-xs'>Россия, Москва, ул. Киевская, 123</p>
            <p className='text-xs'>+7 123 456 678 89</p>
          </div>
        </div>
      </div>
      <h3 className=' mt-6 max-w-[420px] mx-auto lg:-mt-6 mb-4 lg:ml-[30px] font-medium'>Квитанция на счет</h3>
      <div className='bg-white max-w-[420px] mt-8 lg:mt-0 lg:max-w-[360px] mx-auto w-full p-10 rounded-[20px] flex flex-col justify-between'>
        <div className='flex'>
          <div className='flex flex-col items-center'>
            <div className='w-[33px] h-[33px] bg-[#EFEFEF] rounded-md flex justify-center items-center'>
              <img src={sender} alt='*' />
            </div>
          </div>
          <div className='ml-4'>
            <h4 className='text-sm font-medium'>Объем посылки</h4>
            <p className='text-xs mb-2'>12 кг</p>
          </div>
        </div>
        <div className='flex items-center z-10 mt-5'>
          <div className='flex flex-col items-center'>
            <div className='w-[33px] h-[33px] bg-[#EFEFEF] rounded-md flex justify-center items-center'>
              <img src={dollar} alt='*' />
            </div>
          </div>
          <div className='ml-4'>
            <h4 className='text-sm font-medium'>Цена за кг</h4>
            <p className='text-xs mb-2'>5$</p>
          </div>
        </div>
        <div className='flex justify-between items-center my-5'>
          <h4 className='font-medium'>Итого</h4>
          <span className='font-medium'>60$</span>
        </div>
        <div className='flex justify-end mt-2'>
          <span className='colGreen2 rounded-[10px] bg-colGreen2 px-6 py-2 font-medium'>
            Оплачено
          </span>
        </div>
      </div>
    </div>
  );
};

export default DetailInfo;
