import { useLocation } from 'react-router-dom';
import { ClothesFilter, ClothesSort, ItemsCard } from '../../../components';
import { useEffect, useState } from 'react';
import { scrollToTop } from '../../../helpers/ScrollToTop/scrollToTop';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems, fetchItemsNextPage } from '../../../api/gb-shop/items';
import { ContentLoading } from '../../../helpers/Loader/Loader';
import { ErrorServer } from '../../../helpers/Errors/ErrorServer';
import GBSHopEmpty from '../../../helpers/Errors/GBSHopEmpty';
import { useInView } from 'react-intersection-observer';

const Items = () => {
  const { loading, error, items } = useSelector((state) => state?.items);

  const [scrollLoading, setScrollLoading] = useState(false);
  const [nextPage, setNextPage] = useState(null);

  const [ref, inView] = useInView();
  const { state } = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const { success, data } = await fetchItems(dispatch, state?.category);
      if (success) {
        setNextPage(data?.next);
      }
    })();
  }, [dispatch, state?.category]);

  const handleIntersection = async () => {
    if (nextPage) {
      setScrollLoading(true);
      const { success, data } = await fetchItemsNextPage(
        dispatch,
        nextPage,
        items
      );
      if (success) {
        setNextPage(data?.next);
        setScrollLoading(false);
      }
      setScrollLoading(false);
    }
  };

  useEffect(() => {
    if (inView) {
      handleIntersection();
    }
  }, [inView]);

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div className='py-16 mm:py-20 min-h-[991px]'>
      <div className='container'>
        <div className='bg-[#FBFBFB] py-1 lg:py-2 px-3 lg:px-5 my-4'>
          <h3 className='font-bold font-ubuntu text-[#030303] text-xl md:text-2xl lg:text-3xl'>
            {state?.from}
          </h3>
        </div>
      </div>
      <div className='container mb-2'>
        <ClothesSort />
      </div>
      <div className='flex container pb-8 pt-4'>
        <div className='max-w-[240px] w-full'>
          <ClothesFilter categoryID={state?.category} setNextPage={setNextPage} />
        </div>
        {loading ? (
          <ContentLoading extraStyle={380} />
        ) : items?.length ? (
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3 sx:gap-4 lg:gap-5 pl-4'>
            {items?.map((el) => (
              <ItemsCard key={el?.id} el={el} />
            ))}
          </div>
        ) : error ? (
          <div className='pt-20 w-full'>
            <ErrorServer />
          </div>
        ) : (
          <div className='pt-20 w-full'>
            <GBSHopEmpty
              title='Ничего не нашли!'
              desc='К сожалению, по вашему запросу ничего не нашли.'
            />
          </div>
        )}
      </div>
      {!loading && (
        <div ref={ref} className='p-1'>
          {scrollLoading && <ContentLoading />}
        </div>
      )}
    </div>
  );
};

export default Items;
