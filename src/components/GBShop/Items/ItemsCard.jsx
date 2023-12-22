import { NavLink, useLocation } from 'react-router-dom';
import shoppingCart from '../../../assets/gb-shop/icons/shopping-cart.svg';
import favIcon from '../../../assets/gb-shop/icons/favorite.svg';
import share from '../../../assets/gb-shop/icons/share.svg';
import noImg from '../../../assets/images/no-image.jpeg';
import { useEffect, useState } from 'react';
import {
  addToFavorites,
  fetchFavoriteItems,
  removeFromFavorites,
} from '../../../api/gb-shop/items';
import { useSelector } from 'react-redux';

const ItemsCard = ({ el }) => {
  const { userID } = useSelector((state) => state?.user);
  const { pathname } = useLocation();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const unsubscribe = fetchFavoriteItems(userID, (favData) => {
      setIsFavorite(favData?.some((item) => item.id === el?.id));
    });
    return () => unsubscribe();
  }, [userID, el?.id]);

  const handleToggleFavorite = async () => {
    if (isFavorite) {
      await removeFromFavorites(userID, el?.id);
    } else {
      await addToFavorites(userID, el);
    }

    setIsFavorite(!isFavorite);
  };

  return (
    <div className='overflow-hidden rounded-xl border-2 border-gray-100 relative shadow-[rgba(17,_17,_26,_0.1)_0px_5px_20px]'>
      <NavLink
        to={`/gb-shop/items/${el?.id}`}
        state={
          pathname === '/gb-shop/favorites'
            ? { category: el?.category }
            : { category: el?.category?.id }
        }
      >
        <div className='h-[210px] overflow-hidden relative bg-gray-50'>
          <img
            className='w-full h-full object-cover'
            src={el?.image}
            onError={(e) => {
              e.target.onError = null;
              e.target.src = noImg;
            }}
            alt='*'
          />
          <div className='absolute bottom-2 right-2 font-medium text-sm bg-colYellow py-[2px] px-2 rounded-sm z-10'>
            {el?.cost} $
          </div>
          <div className='absolute bottom-0 left-0 w-full h-12 bg-[linear-gradient(180deg,_rgba(0,_0,_0,_0.0)_0%,_rgba(0,_0,_0,_0.50)_200%)]'></div>
          _{' '}
        </div>
      </NavLink>
      {el?.country && (
        <img
          className='absolute top-3 left-3 min-w-[32px] w-8 h-8 object-cover rounded-full'
          src={el?.country?.icon}
          onError={(e) => {
            e.target.onError = null;
            e.target.src = noImg;
          }}
          alt='*'
        />
      )}
      <div className='absolute top-4 right-4 w-8 h-8 cursor-pointer rounded-full bg-gray-300 bg-opacity-50 flex justify-center items-center'>
        <img src={share} alt='*' />
      </div>
      <div className='p-2'>
        <NavLink
          to='#'
          state={{ from: el?.category?.nameRus, category: el?.category?.id }}
          className='font-bold text-sm line-clamp-1 break-all hover:underline pb-2 w-max'
        >
          {el?.name}
        </NavLink>
        <div className='flex justify-between items-center'>
          <div className='flex items-center pt-1'>
            <div className='min-w-[20px] w-5 h-5 rounded-full border border-gray-300'>
              <img
                className='w-full h-full object-cover rounded-full'
                src={el?.supplier?.avatar}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = noImg;
                }}
                alt='*'
              />
            </div>
            <p className='text-xs text-[#A7A9B7] ml-1 line-clamp-1 break-all'>
              {el?.supplier?.fullname}
            </p>
          </div>
          <div className='flex justify-end items-center space-x-2'>
            <div
              onClick={handleToggleFavorite}
              className={`${
                isFavorite ? 'bg-colYellow' : 'bg-gray-100'
              } flex justify-center items-center w-8 h-8 min-w-[32px] rounded-full cursor-pointer`}
            >
              <img className='w-5' src={favIcon} alt='*' />
            </div>
            <div className='flex justify-center items-center w-8 h-8 min-w-[32px] bg-gray-100 rounded-full cursor-pointer'>
              <img className='w-5' src={shoppingCart} alt='*' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemsCard;
