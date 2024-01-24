import { useEffect, useState } from 'react';
import { ButtonLoading, ContentLoading } from '../../../helpers/Loader/Loader';
import { ErrorServer } from '../../../helpers/Errors/ErrorServer';
import GBSHopEmpty from '../../../helpers/Errors/GBSHopEmpty';
import { ItemsCard } from '../../../components';
import { useLocation } from 'react-router-dom';
import { scrollToTop } from '../../../helpers/ScrollToTop/scrollToTop';
import { fetchBrandsItem } from '../../../api/gb-shop/items';

const Brands = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { state } = useLocation();

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const { success, data, count } = await fetchBrandsItem(state?.brandID, 1);
      if (success) {
        setItems(data);
        setTotalPages(Math.ceil(count / 20));
        setIsLoading(false);
      } else {
        setItems([]);
        setIsLoading(false);
      }
    })();
  }, [state?.brandID]);

  const fetchNextPage = async () => {
    setBtnLoading(true);
    try {
      if (page < totalPages) {
        const { success, data } = await fetchBrandsItem(
          state?.brandID,
          page + 1
        );
        if (success) {
          setItems((prevItems) => [...prevItems, ...data]);
          setPage((prevPage) => prevPage + 1);
        }
      }
    } finally {
      setBtnLoading(false);
    }
  };

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
        <div className='container mm:content'>
          <div className='grid grid-cols-2 md:grid-cols-3 pb-8 lg:grid-cols-4 xl:grid-cols-5 gap-5 lg:gap-7 pt-4'>
            {items?.map((el) => (
              <ItemsCard key={el?.id} el={el} favorite={true} />
            ))}
          </div>
          <div className='flex justify-center pt-5'>
            <button
              onClick={fetchNextPage}
              className='bg-black text-white h-9 w-40 font-medium rounded hover:opacity-70 duration-100 text-sm'
            >
              {btnLoading ? <ButtonLoading /> : 'Загрузить еще'}
            </button>
          </div>
        </div>
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
