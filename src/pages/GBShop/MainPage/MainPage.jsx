import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchHomeItems } from '../../../api/gb-shop/homeItems';
import {
  Brands,
  MainCategories,
  MainBlock,
  CategorySlider,
} from '../../../components';
import { scrollToTop } from '../../../helpers/ScrollToTop/scrollToTop';
import rightArrow from '../../../assets/gb-shop/icons/right.svg';
import { fetchStores } from '../../../api/gb-shop/stores';

const MainPage = () => {
  const { homeItems, loading, error } = useSelector(
    (state) => state?.homeItems
  );
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await fetchHomeItems(dispatch);
      await fetchStores(dispatch);
    })();
  }, [dispatch]);

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div className='pt-28 pb-10'>
      <MainBlock />
      <MainCategories />
      <Brands />
      {homeItems?.map((el, index) => (
        <div className='mm:content' key={index}>
          <div className='flex justify-between items-center bg-[#FBFBFB] py-1 lg:py-2 px-3 lg:px-5 my-7'>
            <h3 className='font-bold font-ubuntu text-[#030303] text-xl md:text-2xl lg:text-3xl'>
              {el?.category?.nameRus}
            </h3>
            <NavLink
              className='flex items-center justify-end'
              to='items'
              state={{
                from: el?.category?.nameRus,
                category: el?.category?.id,
              }}
            >
              <span className='font-medium text-base md:text-xl mr-1 md:mr-2 text-[#FEDE2B]'>
                Все
              </span>
              <img className='w-4 md:w-6' src={rightArrow} alt='*' />
            </NavLink>
          </div>
          <CategorySlider items={el?.items} loading={loading} error={error} />
        </div>
      ))}
    </div>
  );
};

export default MainPage;
