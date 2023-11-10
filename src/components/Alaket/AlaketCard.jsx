import { NavLink } from 'react-router-dom';
import location from '../../assets/icons/location3.svg';
import alaket from '../../assets/icons/alaketIcon.svg';
import dollar from '../../assets/icons/dollarAlaket.svg';

const AlaketCard = () => {
  return (
    <NavLink
      to='#'
      className='shadow-[0_0_24px_#d3d1d1] rounded-lg p-4 mb-6'
    >
      <div className='w-[97%] -mt-9 mx-auto h-40 overflow-hidden rounded-lg bg-gray-100 border-2 border-[#f2efef]'>
        <img
          className='w-full h-full object-cover'
          src='https://unctad.org/sites/default/files/inline-images/ccpb_workinggroup_productsafety_800x450.jpg'
          alt='*'
        />
      </div>
      <div className='flex justify-between items-center pt-3 pb-2'>
        <div className='flex items-center'>
          <img
            className='min-w-[28px] w-7 h-7 rounded-full mr-2'
            src='https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg'
            alt='*'
          />
          <span className='font-medium text-sm line-clamp-1 break-all'>
            Артур Галиев
          </span>
        </div>
        <span className='text-xs opacity-60 ml-1'>22.12.2023</span>
      </div>
      <h4 className='font-medium text-sm italic line-clamp-2 break-all'>
        &quot;Возьму собой маленький чемодан или сумку до 10 кг.&quot;
      </h4>
      <div className='flex justify-between items-center mt-1.5 mb-4'>
        <div className='flex items-center w-2/5'>
          <div className='min-w-[16px] w-4 h-4 rounded-full flex justify-center items-center border border-black'>
            <span className='w-2 h-2 rounded-full bg-black'></span>
          </div>
          <span className='ml-1 text-sm font-medium line-clamp-1 break-all'>
            Бишкек
          </span>
        </div>
        <span className='min-w-[34px] flex'>- - - &gt;</span>
        <div className='flex justify-end items-center w-2/5'>
          <img className='w-5' src={location} alt='*' />
          <span className='ml-1 text-sm font-medium line-clamp-1 break-all'>
            Москва
          </span>
        </div>
      </div>
      <div className='flex justify-between items-center'>
        <div className='flex items-center'>
          <img src={dollar} alt='*' />
          <span className='text-sm ml-1'>Договорная</span>
        </div>
        <img className='w-10' src={alaket} alt='*' />
      </div>
      <div className='bg-[#66B0F0] text-white rounded-tl-lg rounded-br-lg px-3 py-1 mt-4 text-center font-medium'>Возьму собой</div> 
    </NavLink>
  );
};

export default AlaketCard;
