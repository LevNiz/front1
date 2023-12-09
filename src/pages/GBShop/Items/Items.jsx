import { useLocation } from 'react-router-dom';
import { ItemsCard } from '../../../components';
import { useEffect } from 'react';
import { scrollToTop } from '../../../helpers/ScrollToTop/scrollToTop';
import { useSelector } from 'react-redux';

const Items = () => {
  const location = useLocation();
  const { homeItems } = useSelector((state) => state?.homeItems);

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div className='py-24 min-h-[991px]'>
      <div className='content'>
        <div className='bg-[#FBFBFB] py-2 px-5 my-7'>
          <h3 className='font-bold font-ubuntu text-[#030303] text-3xl'>
            {location?.state?.from}
          </h3>
        </div>
      </div>
      <div className='grid grid-cols-5 gap-7 container pt-8'>
        {homeItems[0]?.items?.map((el) => (
          <ItemsCard key={el?.id} el={el} />
        ))}
      </div>
    </div>
  );
};

export default Items;
