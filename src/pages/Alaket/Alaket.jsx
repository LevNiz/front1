import { useEffect } from 'react';
import { AlaketItem } from '../../components';
import { scrollToTop } from '../../helpers/ScrollToTop/scrollToTop';
import { useNavigate } from 'react-router-dom';

const Alaket = () => {
  const navigate = useNavigate();

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div className='content py-20 min-h-[720px]'>
      <div className='flex justify-between items-center pb-5 pt-5 sm:pt-8'>
        <h1 className='text-2xl mr-3 sm:text-3xl font-medium sm:font-bold text-center'>Алакет</h1>
        <button
          onClick={() => navigate('new')}
          className='font-medium hover:opacity-80 p-3 rounded-lg bg-colYellow duration-150 max-w-[180px] sm:max-w-[240px] w-full'
        >
          Опубликовать
        </button>
      </div>
      <AlaketItem />
    </div>
  );
};

export default Alaket;
