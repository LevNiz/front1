import { useEffect, useState } from 'react';
import { ContentLoading } from '../../../helpers/Loader/Loader';
import { ErrorServer } from '../../../helpers/Errors/ErrorServer';
import GBSHopEmpty from '../../../helpers/Errors/GBSHopEmpty';
import { ItemsCard } from '../../../components';
import { useLocation, useParams } from 'react-router-dom';
import { scrollToTop } from '../../../helpers/ScrollToTop/scrollToTop';
import {
  fetchBrandItemsNextPage,
  fetchBrandsItem,
} from '../../../api/gb-shop/items';
import { useInView } from 'react-intersection-observer';

const BrandsItems = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [scrollLoading, setScrollLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [nextPage, setNextPage] = useState(null);

  const { id } = useParams();
  const { state } = useLocation();
  const [ref, inView] = useInView();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { success, data } = await fetchBrandsItem(id);
        if (success) {
          setItems(data?.results);
          setNextPage(data?.next);
        } else {
          setItems([]);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleIntersection = async () => {
    if (nextPage) {
      setScrollLoading(true);
      const { data } = await fetchBrandItemsNextPage(nextPage);
      const newItems = data?.results;
      if (data?.next) {
        setNextPage(data?.next);
        setItems([...items, ...newItems]);
        setScrollLoading(false);
      } else {
        setScrollLoading(false);
        setNextPage(null);
      }
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
    <div className='py-24 min-h-[991px]'>
      <div className='content'>
        <div className='bg-[#FBFBFB] py-1 lg:py-2 px-3 lg:px-5 mb-4'>
          <h3 className='font-bold font-ubuntu text-[#030303] text-2xl lg:text-3xl'>
            {state?.from}
          </h3>
        </div>
      </div>
      {isLoading ? (
        <ContentLoading extraStyle={380} />
      ) : items === 'error' ? (
        <ErrorServer />
      ) : items?.length ? (
        <>
          <div
            id='brands-container'
            className='grid grid-cols-2 md:grid-cols-3 pb-8 lg:grid-cols-4 xl:grid-cols-5 gap-5 lg:gap-7 pt-4 container mm:content'
          >
            {items?.map((el) => (
              <ItemsCard key={el?.id} el={el} favorite={true} />
            ))}
          </div>
          <div ref={ref} className='p-1'>
            {scrollLoading && <ContentLoading />}
          </div>
        </>
      ) : (
        <div className='pt-20'>
          <GBSHopEmpty
            title='В этом магазине пока нет товаров'
            desc='Здесь будут товары данного магазина.'
          />
        </div>
      )}
    </div>
  );
};

export default BrandsItems;
