import { useLocation } from 'react-router-dom';
import { ItemsCard } from '../../../components';
import { useEffect, useRef, useState } from 'react';
import { scrollToTop } from '../../../helpers/ScrollToTop/scrollToTop';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems, fetchMoreItems } from '../../../api/gb-shop/items';
import { ContentLoading } from '../../../helpers/Loader/Loader';
import { ErrorServer } from '../../../helpers/Errors/ErrorServer';
import GBSHopEmpty from '../../../helpers/Errors/GBSHopEmpty';

const Items = () => {
  const { loading, error, items } = useSelector((state) => state?.items);
  const { categories } = useSelector((state) => state?.categories);

  const [itemsData, setItemsData] = useState([]);
  const [scrollLoading, setScrollLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { state } = useLocation();
  const dispatch = useDispatch();
  const containerRef = useRef(null);

  const itemCategoryTitle = categories?.filter(
    (el) => el?.id === state?.category
  );

  useEffect(() => {
    setItemsData(items);
  }, [items]);

  useEffect(() => {
    (async () => {
      const { success, count } = await fetchItems(dispatch, 1, state?.category);
      if (success) {
        setTotalPages(Math.ceil(count / 20));
      }
    })();
  }, [dispatch, state?.category]);

  useEffect(() => {
    const container = containerRef.current;

    const fetchNextPage = async () => {
      if (page < totalPages) {
        setScrollLoading(true);
        try {
          const { success, data } = await fetchMoreItems(
            page + 1,
            state?.category
          );
          if (success) {
            setItemsData((prevItems) => [...prevItems, ...data]);
            setPage((prevPage) => prevPage + 1);
          }
        } finally {
          setScrollLoading(false);
        }
      }
    };
    if (container) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            fetchNextPage();
          }
        },
        {
          root: null,
          rootMargin: '0px',
          threshold: 0.1,
        }
      );
      observer.observe(container);

      return () => {
        observer.disconnect();
      };
    }
  }, [page, totalPages, state?.category]);

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
      ) : itemsData?.length ? (
        <>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 lg:gap-7 container pb-8 pt-4'>
            {itemsData?.map((el) => (
              <ItemsCard key={el?.id} el={el} />
            ))}
          </div>
          <div ref={containerRef} className='p-1'>
            {scrollLoading && <ContentLoading />}
          </div>
        </>
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
