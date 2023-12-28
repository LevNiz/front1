import { NavLink } from 'react-router-dom';
import rightArrow from '../../../assets/gb-shop/icons/right.svg';
import { useEffect } from 'react';
import { fetchCategories } from '../../../api/gb-shop/categories';
import { useDispatch, useSelector } from 'react-redux';
import { ContentLoading } from '../../../helpers/Loader/Loader';
import { ErrorServer } from '../../../helpers/Errors/ErrorServer';
import GBSHopEmpty from '../../../helpers/Errors/GBSHopEmpty';
import noImg from '../../../assets/images/no-image.svg';

const MainCategories = () => {
  const { loading, error, categories } = useSelector(
    (state) => state?.categories
  );
  const dispatch = useDispatch();

  const firstSevenCategories = categories?.slice(0, 7);

  useEffect(() => {
    (async () => {
      await fetchCategories(dispatch);
    })();
  }, [dispatch]);

  return (
    <div className='content'>
      <div className='flex justify-between items-center bg-[#FBFBFB] py-1 lg:py-2 px-3 lg:px-5 my-7'>
        <h3 className='font-bold font-ubuntu text-[#030303] text-xl md:text-2xl lg:text-3xl'>
          Категории
        </h3>
        <NavLink to='categories' className='flex items-center justify-end'>
          <span className='font-medium text-base md:text-xl mr-1 md:mr-2 text-[#FEDE2B]'>
            Все
          </span>
          <img className='w-4 md:w-6' src={rightArrow} alt='*' />
        </NavLink>
      </div>
      {loading ? (
        <ContentLoading extraStyle={164} />
      ) : error ? (
        <ErrorServer />
      ) : firstSevenCategories?.length ? (
        <div className='flex lg:grid grid-cols-7 gap-3 md:gap-5 lg:gap-7 pt-3 overflow-x-scroll xl:overflow-hidden scrollable pb-4'>
          {firstSevenCategories?.map((el) => (
            <NavLink
              to='items'
              state={{ from: el?.nameRus, category: el?.id }}
              className='group min-w-[92px] md:min-w-[128px]'
              key={el?.id}
            >
              <div className='h-[92px] md:h-32 xl:h-36 flex justify-center items-center shadow-md group-hover:shadow-xl duration-150 bg-[#FBFBFB] rounded-xl'>
                <img
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = noImg;
                  }}
                  className='mx-auto'
                  src={el?.icon ? el?.icon : noImg}
                  alt='*'
                />
              </div>
              <p className='text-center text-xs md:text-base xl:text-xl break-all lg:break-normal line-clamp-1 lg:line-clamp-2 font-medium pt-3'>
                {el?.nameRus}
              </p>
            </NavLink>
          ))}
        </div>
      ) : (
        <GBSHopEmpty />
      )}
    </div>
  );
};

export default MainCategories;
