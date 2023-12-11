import { useLocation } from 'react-router-dom';
import { ItemsCard } from '../../../components';
import { useEffect } from 'react';
import { scrollToTop } from '../../../helpers/ScrollToTop/scrollToTop';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems } from '../../../api/gb-shop/items';
import { ContentLoading } from '../../../helpers/Loader/Loader';
import { ErrorServer } from '../../../helpers/Errors/ErrorServer';
import GBSHopEmpty from '../../../helpers/Errors/GBSHopEmpty';

const Items = () => {
  const { state } = useLocation();
  const { loading, error, items } = useSelector((state) => state?.items);
  const dispatch = useDispatch();

  const filteredItems = items?.filter(
    (el) => el?.category?.id === state?.category
  );

  useEffect(() => {
    (async () => {
      await fetchItems(dispatch);
    })();
  }, [dispatch]);

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div className='py-24 min-h-[991px] w-full'>
      <div className='content'>
        <div className='bg-[#FBFBFB] py-2 px-5 my-7'>
          <h3 className='font-bold font-ubuntu text-[#030303] text-3xl'>
            {state?.from}
          </h3>
        </div>
      </div>
      {loading ? (
        <ContentLoading extraStyle={380} />
      ) : filteredItems?.length ? (
        <div className='grid grid-cols-5 gap-7 container pt-4'>
          {filteredItems?.map((el) => (
            <ItemsCard key={el?.id} el={el} />
          ))}
        </div>
      ) : error ? (
        <div className='pt-20'>
          <ErrorServer />
        </div>
      ) : (
        <div className='pt-20'>
          <GBSHopEmpty
            title='Ничего не нашли!'
            desc='К сожалению, по вашему запросу ничего не нашли.'
          />
        </div>
      )}
    </div>
  );
};

export default Items;
