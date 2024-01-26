import { useEffect, useRef, useState } from 'react';
import { ContentLoading } from '../../../helpers/Loader/Loader';
import { ErrorServer } from '../../../helpers/Errors/ErrorServer';
import GBSHopEmpty from '../../../helpers/Errors/GBSHopEmpty';
import { ItemsCard } from '../../../components';
import { useLocation } from 'react-router-dom';
import { scrollToTop } from '../../../helpers/ScrollToTop/scrollToTop';
import { fetchBrandsItem } from '../../../api/gb-shop/items';

const Brands = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [scrollLoading, setScrollLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const containerRef = useRef(null);
  const { state } = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { success, data, count } = await fetchBrandsItem(
          state?.brandID,
          1
        );
        if (success) {
          setItems(data);
          setTotalPages(Math.ceil(count / 20));
        } else {
          setItems([]);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [state?.brandID]);

  useEffect(() => {
    const container = containerRef.current;

    const fetchNextPage = async () => {
      if (page < totalPages) {
        setScrollLoading(true);
        try {
          const { success, data } = await fetchBrandsItem(
            state?.brandID,
            page + 1
          );
          if (success) {
            setItems((prevItems) => [...prevItems, ...data]);
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
  }, [containerRef, page, state?.brandID, totalPages]);

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div className='py-24 min-h-[991px]'>
      <div className='content'>
        <div className='bg-[#FBFBFB] py-1 lg:py-2 px-3 lg:px-5 mb-4'>
          <h3 className='font-bold font-ubuntu text-[#030303] text-2xl lg:text-3xl'>
            {state?.brandName}
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
          <div ref={containerRef} className='p-1'>
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

export default Brands;
