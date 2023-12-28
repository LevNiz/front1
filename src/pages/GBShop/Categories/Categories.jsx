import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { scrollToTop } from '../../../helpers/ScrollToTop/scrollToTop';
import { fetchCategories } from '../../../api/gb-shop/categories';
import { useDispatch, useSelector } from 'react-redux';
import { ContentLoading } from '../../../helpers/Loader/Loader';
import { ErrorServer } from '../../../helpers/Errors/ErrorServer';
import GBSHopEmpty from '../../../helpers/Errors/GBSHopEmpty';
import noImg from '../../../assets/images/no-image.svg';

const Categories = () => {
  const { loading, error, categories } = useSelector(
    (state) => state?.categories
  );
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await fetchCategories(dispatch);
    })();
  }, [dispatch]);

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div className='py-16 mm:py-24 content min-h-[991px]'>
      <div className='bg-[#FBFBFB] py-1 lg:py-2 px-3 lg:px-5 my-7'>
        <h3 className='font-bold font-ubuntu text-[#030303] text-xl md:text-2xl lg:text-3xl'>
          Категории
        </h3>
      </div>
      {loading ? (
        <ContentLoading extraStyle={380} />
      ) : error ? (
        <div className='pt-20'>
          <ErrorServer />
        </div>
      ) : categories?.length ? (
        <div className='grid grid-cols-2 ss:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-4 md:gap-7 pt-3'>
          {categories?.map((el) => (
            <Link
              to='/gb-shop/items'
              key={el?.id}
              state={{ from: el?.nameRus, category: el?.id }}
              className='group'
            >
              <div className='h-28 sm:h-32 mm:h-36 flex justify-center items-center shadow-md overflow-hidden group-hover:shadow-xl duration-150 bg-[#FBFBFB] rounded-xl'>
                <img
                  className='mx-auto'
                  src={el?.icon ? el?.icon : noImg}
                  onError={(e) => {
                    e.target.onError = null;
                    e.target.src = noImg;
                  }}
                  alt='*'
                />
              </div>
              <p className='text-center text-sm sm:text-base xl:text-xl font-medium pt-3'>
                {el?.nameRus}
              </p>
            </Link>
          ))}
        </div>
      ) : (
        <div className='pt-20'>
          <GBSHopEmpty
            title='Ничего не нашли!'
            desc='К сожалению по вашему запросу ничего не наши '
          />
        </div>
      )}
    </div>
  );
};

export default Categories;
