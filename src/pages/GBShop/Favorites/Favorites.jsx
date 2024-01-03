import { useEffect } from 'react';
import { FavoritesItem } from '../../../components';
import { scrollToTop } from '../../../helpers/ScrollToTop/scrollToTop';

const Favorites = () => {
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div className='py-24 min-h-[991px]'>
      <div className='content'>
        <div className='bg-[#FBFBFB] py-1 lg:py-2 px-3 lg:px-5 mb-4'>
          <h3 className='font-bold font-ubuntu text-[#030303] text-2xl lg:text-3xl'>
            Избранные
          </h3>
        </div>
      </div>
      <FavoritesItem />
    </div>
  );
};

export default Favorites;
