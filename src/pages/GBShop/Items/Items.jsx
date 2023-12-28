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
  const { loading, error, items } = useSelector((state) => state?.items);
  const { categories } = useSelector((state) => state?.categories);

  const { state } = useLocation();
  const dispatch = useDispatch();

  const filteredItems = items?.filter(
    (el) => el?.category?.id === state?.category
  );

  const itemCategoryTitle = categories?.filter(
    (el) => el?.id === state?.category
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
    <div className='py-16 mm:py-24 min-h-[991px]'>
      <div className='content'>
        <div className='bg-[#FBFBFB] py-1 lg:py-2 px-3 lg:px-5 my-4'>
          <h3 className='font-bold font-ubuntu text-[#030303] text-xl md:text-2xl lg:text-3xl'>
            {itemCategoryTitle[0]?.nameRus}
          </h3>
        </div>
      </div>
      {loading ? (
        <ContentLoading extraStyle={380} />
      ) : filteredItems?.length ? (
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 lg:gap-7 container pt-4'>
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
