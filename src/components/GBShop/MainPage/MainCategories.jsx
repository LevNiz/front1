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

  const firstSevenCatalogs = categories.slice(0, 7);

  useEffect(() => {
    (async () => {
      await fetchCategories(dispatch);
    })();
  }, [dispatch]);

  return (
    <>
      <div className='flex justify-between items-center bg-[#FBFBFB] py-2 px-5 my-7'>
        <h3 className='font-bold font-ubuntu text-[#030303] text-3xl'>
          Категории
        </h3>
        <NavLink to='categories' className='flex items-center justify-end'>
          <span className='font-medium text-xl mr-2 text-[#FEDE2B]'>Все</span>
          <img src={rightArrow} alt='*' />
        </NavLink>
      </div>
      {loading ? (
        <ContentLoading extraStyle={164} />
      ) : error ? (
        <ErrorServer />
      ) : firstSevenCatalogs?.length ? (
        <div className='grid grid-cols-7 gap-7 pt-3'>
          {firstSevenCatalogs?.map((el) => (
            <NavLink
              to='items'
              state={{ from: el?.name, category: el?.id }}
              className='group'
              key={el?.id}
            >
              <div className='h-36 flex justify-center items-center shadow-md group-hover:shadow-xl duration-150 bg-[#FBFBFB] rounded-xl'>
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
              <p className='text-center text-xl font-medium pt-3'>
                {el?.nameRus}
              </p>
            </NavLink>
          ))}
        </div>
      ) : (
        <GBSHopEmpty />
      )}
    </>
  );
};

export default MainCategories;
