import { NavLink } from 'react-router-dom';
import location from '../../assets/icons/location3.svg';
import alaketIcon from '../../assets/icons/alaketIcon.svg';
import dollarIcon from '../../assets/icons/dollarAlaket.svg';
import noImg from '../../assets/images/no-image.svg';
import noAva from '../../assets/images/no-ava.jpeg';

const AlaketCard = ({ el }) => {
  return (
    <NavLink
      to={`${el?.id}`}
      className='shadow-[0_0_24px_#d3d1d1] rounded-lg p-4 mb-6'
    >
      <div className='w-[97%] -mt-9 mx-auto h-40 overflow-hidden rounded-lg bg-gray-100 border-2 border-[#f2efef]'>
        <img
          className='w-full h-full object-cover'
          src={el?.photo}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = noImg;
          }}
          alt='*'
        />
      </div>
      <div className='flex justify-between items-center pt-3 pb-2'>
        <div className='flex items-center'>
          <img
            className='min-w-[28px] w-7 h-7 rounded-full mr-2 object-cover border border-gray-200'
            src={el?.client?.avatar}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = noAva;
            }}
            alt='*'
          />
          <span className='font-medium text-sm line-clamp-1 break-all'>
            {el?.client?.fullname}
          </span>
        </div>
        <span className='text-xs opacity-60 ml-1'>{el?.date || '-- --'}</span>
      </div>
      <h4 className='font-medium text-sm italic line-clamp-2 break-all min-h-[40px]'>
        &quot; {el?.title} &quot;
      </h4>
      <div className='flex justify-between items-center mt-1.5 mb-4'>
        <div className='flex items-center w-2/5'>
          <div className='min-w-[16px] w-4 h-4 rounded-full flex justify-center items-center border border-black'>
            <span className='w-2 h-2 rounded-full bg-black'></span>
          </div>
          <span className='ml-1 text-sm font-medium line-clamp-1 break-all'>
            {el?.fromCity?.nameRu || 'Не указан'}
          </span>
        </div>
        <span className='min-w-[34px] flex'>- - - &gt;</span>
        <div className='flex justify-end items-center w-2/5'>
          <img className='w-5' src={location} alt='*' />
          <span className='ml-1 text-sm font-medium line-clamp-1 break-all'>
            {el?.toCity?.nameRu || 'Не указан'}
          </span>
        </div>
      </div>
      <div className='flex justify-between items-center'>
        <div className='flex items-center'>
          <img src={dollarIcon} alt='*' />
          <span className='text-sm ml-1 font-medium'>
            {el?.cost === 0 ? 'Договорная' : el?.cost}
          </span>
        </div>
        <img className='w-10' src={alaketIcon} alt='*' />
      </div>
      <div
        className={`${
          el?.type === 'alaketem'
            ? 'bg-gradient-to-b from-[#66B0F0] via-blue-500 to-[#0052B4]'
            : 'bg-gradient-to-b from-[#AC92CE] to-[#9848FF]'
        } text-white rounded-tl-lg rounded-br-lg px-3 py-1 mt-4 text-center font-medium`}
      >
        {el?.type === 'alaketem' ? 'Возьму собой' : 'Передаю'}
      </div>
    </NavLink>
  );
};

export default AlaketCard;
