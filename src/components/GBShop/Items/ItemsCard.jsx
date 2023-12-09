import { NavLink } from 'react-router-dom';
import shopingCart from '../../../assets/gb-shop/icons/shopping-cart.svg';
import favourite from '../../../assets/gb-shop/icons/favourite.svg';
import share from '../../../assets/gb-shop/icons/share.svg';

const CategoryCard = ({ el }) => {
  return (
    <div className='overflow-hidden rounded-xl shadow-lg relative'>
      <NavLink to='#'>
        <div className='h-[210px] overflow-hidden'>
          <img className='w-full h-full object-cover' src={el?.image} alt='*' />
        </div>
      </NavLink>
      <img
        className='absolute top-4 left-4 rounded-full'
        src={el?.countryFlag}
        alt='*'
      />
      <div className='absolute top-4 right-4 w-8 h-8 cursor-pointer rounded-full bg-gray-300 bg-opacity-50 flex justify-center items-center'>
        <img src={share} alt='*' />
      </div>
      <div className='p-3'>
        <NavLink
          to='#'
          className='font-bold text-sm line-clamp-1 break-all hover:underline pb-2 w-max'
        >
          {el?.name}
        </NavLink>
        <div className='flex justify-between items-center'>
          <div className='flex items-center pt-1'>
            <img className='w-[15px]' src={el?.storeLogo} alt='*' />
            <p className='text-xs text-[#A7A9B7] ml-1 line-clamp-1 break-all'>
              {el?.storeName}
            </p>
          </div>
          <div className='flex justify-end items-center space-x-3'>
            <div className='flex justify-center items-center w-8 h-8 min-w-[32px] bg-[#f0efef] rounded-full cursor-pointer'>
              <img className='w-5' src={favourite} alt='*' />
            </div>
            <div className='flex justify-center items-center w-8 h-8 min-w-[32px] bg-[#f0efef] rounded-full cursor-pointer'>
              <img className='w-5' src={shopingCart} alt='*' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
