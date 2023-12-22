import { useEffect } from 'react';
import { FavoritesItem } from '../../../components';
import { scrollToTop } from '../../../helpers/ScrollToTop/scrollToTop';

const Favorites = () => {
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div className='py-24 content min-h-[991px]'>
      <div className='bg-[#FBFBFB] py-2 p-5 mb-4'>
        <h3 className='font-bold font-ubuntu text-[#030303] text-3xl'>
          Избранные
        </h3>
      </div>
      <FavoritesItem />
    </div>
  );
};

export default Favorites;
