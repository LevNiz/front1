import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { ContentLoading } from '../../helpers/Loader/Loader';
import { ErrorServer } from '../../helpers/Errors/ErrorServer';
import { fetchCategories } from '../../api/gb-shop/categories';
import GBSHopEmpty from '../../helpers/Errors/GBSHopEmpty';
import arrow from '../../assets/icons/down.svg';

const GBShopCatalog = ({ isOpen, onClose }) => {
  const { categories, loading, error } = useSelector(
    (state) => state?.categories
  );
  const [expandedCategory, setExpandedCategory] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await fetchCategories(dispatch);
    })();
  }, [dispatch]);

  return (
    <>
      <div
        className={`
        fixed top-0 ${isOpen ? 'left-0' : '-left-full'}
        w-[80%] sm:w-full sm:max-w-xs h-full transition-all duration-200 bg-white z-[99999] py-6`}
      >
        <h3 className='pt-16 pb-2 font-medium text-xl px-3'>Выберите товар</h3>
        <ul className='ss:ml-4 pt-4 px-3 overflow-hidden overflow-y-scroll space-y-5 h-full'>
          {loading ? (
            <ContentLoading extraStyle={480} />
          ) : error ? (
            <ErrorServer />
          ) : categories?.length ? (
            <>
              {categories?.map((el) => (
                <li key={el?.id}>
                  <div className='flex justify-between items-center'>
                    <NavLink
                      to={`/gb-shop/items`}
                      onClick={() => onClose()}
                      state={{ from: el?.nameRus, category: el?.id }}
                      className='flex items-center'
                    >
                      <img
                        className='min-w-[40px] w-10 h-8 object-cover'
                        src={el?.icon}
                        alt='*'
                      />
                      <span className='ml-1'>{el?.nameRus}</span>
                    </NavLink>
                    <div
                      onClick={() =>
                        setExpandedCategory((prevCategory) =>
                          prevCategory === el?.id ? null : el?.id
                        )
                      }
                      className={`${
                        el?.store?.length > 0 ? '' : 'hidden'
                      } pr-1`}
                    >
                      <img
                        className={`${
                          expandedCategory === el?.id ? 'rotate-180' : ''
                        } duration-200 w-3 cursor-pointer`}
                        src={arrow}
                        alt='*'
                      />
                    </div>
                  </div>
                  {expandedCategory === el?.id && (
                    <div className='space-y-2'>
                      {el?.store?.map((item) => (
                        <NavLink
                          to='/gb-shop/brands'
                          onClick={() => onClose()}
                          state={{
                            brandID: item?.id,
                            brandName: item?.fullname,
                          }}
                          key={item?.id}
                          className='flex items-center pl-8'
                        >
                          <img
                            className='w-6 h-5 object-contain'
                            src={item?.avatar}
                            alt='*'
                          />
                          <p className='text-sm pl-1 line-clamp-1 break-all'>
                            {item?.fullname}
                          </p>
                        </NavLink>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </>
          ) : (
            <div className='px-5 pt-40'>
              <GBSHopEmpty
                title='Ничего не нашли!'
                desc='Пока нет категорий товаров'
              />
            </div>
          )}
        </ul>
      </div>
      <div
        onClick={() => onClose()}
        className={`
          fixed ${isOpen ? 'visible opacity-100' : 'invisible opacity-0'}
          top-0 right-0 w-full h-full bg-black bg-opacity-50 z-[9999] 
          transition-opacity duration-300 ease-in-out
        `}
      ></div>
    </>
  );
};

export default GBShopCatalog;
