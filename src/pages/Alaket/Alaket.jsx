import { useEffect } from 'react';
import { AlaketItem } from '../../components';
import { scrollToTop } from '../../helpers/ScrollToTop/scrollToTop';

const Alaket = () => {
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div className='content py-20 min-h-[720px]'>
      <div className='flex justify-between items-center pb-5 pt-8'>
        <h1 className='text-3xl font-bold text-center'>Алакет</h1>
        <button className='font-medium hover:opacity-80 p-3 rounded-lg bg-colYellow duration-150 max-w-[240px] w-full'>
          Опубликовать
        </button>
      </div>
      <AlaketItem />
    </div>
  );
};

export default Alaket;
