import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { ContentLoading } from '../../../helpers/Loader/Loader';
import { ErrorServer } from '../../../helpers/Errors/ErrorServer';
import GBSHopEmpty from '../../../helpers/Errors/GBSHopEmpty';
import { scrollToTop } from '../../../helpers/ScrollToTop/scrollToTop';
import { fetchBrands } from '../../../api/gb-shop/brands';
import noImg from '../../../assets/images/no-image.svg';

const Brands = () => {
  const { stores, loading, error } = useSelector((state) => state?.stores);

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await fetchBrands(dispatch);
    })();
  }, [dispatch]);

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div className='py-24 min-h-[991px] content'>
      <div className='bg-[#FBFBFB] py-1 lg:py-2 px-3 lg:px-5 mb-4'>
        <h3 className='font-bold font-ubuntu text-[#030303] text-2xl lg:text-3xl'>
          Бренды
        </h3>
      </div>
      {loading ? (
        <ContentLoading extraStyle={380} />
      ) : error ? (
        <ErrorServer />
      ) : stores?.length ? (
        <div className='grid grid-cols-5 gap-10'>
          {stores?.map((el) => (
            <NavLink
              className='my-7 flex justify-center items-center'
              key={el?.id}
              state={{ from: el?.fullname }}
              to={`${el?.id}`}
            >
              <div>
                <img src={el?.avatar || noImg} alt='*' />
              </div>
            </NavLink>
          ))}
        </div>
      ) : (
        <div className='pt-20'>
          <GBSHopEmpty
            title='Пока нет брендов!'
            desc='К сожалению ничего не нашли по вашему запросу.'
          />
        </div>
      )}
    </div>
  );
};

export default Brands;
