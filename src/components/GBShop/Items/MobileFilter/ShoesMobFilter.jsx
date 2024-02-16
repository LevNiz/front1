import Select from 'react-select';
import {
  costs,
  genderType,
  ordering,
  shoesSizes,
} from '../../../../constants/fakeFilterData';
import { useEffect, useState } from 'react';
import { fetchFilteredBrands } from '../../../../api/gb-shop/brands';
import arrowDown from '../../../../assets/icons/down.svg';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFilterItemsMobile } from '../../../../api/gb-shop/items';
import { ContentLoading } from '../../../../helpers/Loader/Loader';

const ShoesMobFilter = ({ setMobileFilter, categoryID, setNextPage }) => {
  const { loading } = useSelector((state) => state?.items);
  const [isShowFilter, setIsShowFilter] = useState({
    sizes: true,
    costs: true,
    brands: true,
  });
  const [brands, setBrands] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedCosts, setSelectedCosts] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);

  const { control, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();

  const handleCheckboxSizes = async (size) => {
    if (selectedSizes?.includes(size)) {
      setSelectedSizes((prevSizes) =>
        prevSizes.filter((selectedSize) => selectedSize !== size)
      );
    } else {
      setSelectedSizes((prevSizes) => [...prevSizes, size]);
    }
  };

  const handleCheckboxCosts = (minCost, maxCost, isChecked) => {
    if (isChecked) {
      setSelectedCosts((prevCosts) => [...prevCosts, { minCost, maxCost }]);
    } else {
      setSelectedCosts((prevCosts) =>
        prevCosts.filter(
          (cost) => cost.minCost !== minCost || cost.maxCost !== maxCost
        )
      );
    }
  };

  const handleCheckboxBrands = (id) => {
    if (selectedBrands?.includes(id)) {
      setSelectedBrands((prevBrands) =>
        prevBrands.filter((selectedBrand) => selectedBrand !== id)
      );
    } else {
      setSelectedBrands((prevBrands) => [...prevBrands, id]);
    }
  };

  const toggleFilter = (filterName) => {
    setIsShowFilter((prev) => ({
      ...prev,
      [filterName]: !prev[filterName],
    }));
  };

  useEffect(() => {
    (async () => {
      const { success, data } = await fetchFilteredBrands(categoryID);
      if (success) {
        setBrands(data);
      }
    })();
  }, [categoryID]);

  const onSubmit = async (data) => {
    const formData = {
      ...data,
      selectedSizes,
      selectedBrands,
      selectedCosts,
    };
    const { next } = await fetchFilterItemsMobile(
      dispatch,
      categoryID,
      formData
    );
    setMobileFilter(false);
    if (next) {
      setNextPage(next);
    } else {
      setNextPage(null);
    }
  };

  const clearFilter = () => {
    setSelectedSizes([]);
    setSelectedBrands([]);
    setSelectedCosts([]);
    reset();
  };

  return (
    <div className='h-full'>
      <div className='flex justify-between items-center pr-3'>
        <h3 className='text-xl font-semibold'>Фильтр</h3>
        <span onClick={() => setMobileFilter(false)} className='text-3xl'>
          &times;
        </span>
      </div>
      {loading ? (
        <ContentLoading extraStyle='560px' />
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='py-5 overflow-y-scroll scrollable pr-3 h-full'
        >
          <div className='w-full pb-4'>
            <Controller
              name='gender_type'
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  placeholder='Категория'
                  options={genderType?.map((el) => ({
                    value: el?.val,
                    label: el?.name,
                  }))}
                  styles={{
                    control: (provided, state) => ({
                      ...provided,
                      padding: '2px',
                      borderRadius: '8px',
                      boxShadow: state.isFocused ? 0 : 0,
                      border: state.isFocused ? '1px solid #999' : '',
                      '&:hover': {
                        border: state.isFocused ? '1px solid #999' : '',
                      },
                    }),
                    menuPortal: (provided) => ({
                      ...provided,
                      zIndex: 9999999,
                    }),
                    menu: (provided) => ({ ...provided, position: 'absolute' }),
                  }}
                />
              )}
            />
          </div>
          <div className='w-full'>
            <Controller
              name='ordering'
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  placeholder='Сортировка'
                  options={ordering?.map((el) => ({
                    value: el?.val,
                    label: el?.name,
                  }))}
                  styles={{
                    control: (provided, state) => ({
                      ...provided,
                      padding: '2px',
                      borderRadius: '8px',
                      boxShadow: state.isFocused ? 0 : 0,
                      border: state.isFocused ? '1px solid #999' : '',
                      '&:hover': {
                        border: state.isFocused ? '1px solid #999' : '',
                      },
                    }),
                    menuPortal: (provided) => ({
                      ...provided,
                      zIndex: 9999999,
                    }),
                    menu: (provided) => ({ ...provided, position: 'absolute' }),
                  }}
                />
              )}
            />
          </div>
          <div className='space-y-3 pt-5 px-5'>
            <div
              onClick={() => toggleFilter('sizes')}
              className='flex justify-between items-center pb-2 cursor-pointer'
            >
              <span className='font-semibold'>Размеры</span>
              <img
                className={`${
                  isShowFilter?.sizes && 'rotate-[180deg]'
                } w-3 duration-200`}
                src={arrowDown}
                alt='*'
              />
            </div>
            <div
              className={`${
                shoesSizes?.length > 5 &&
                'overflow-y-scroll scrollable h-[172px]'
              } ${
                isShowFilter?.sizes ? 'block' : 'hidden'
              } space-y-3 pb-5 border-b border-colGray2`}
            >
              {shoesSizes?.map((el, index) => (
                <div key={index}>
                  <input
                    className='hidden'
                    type='checkbox'
                    id={`checkbox-${el?.id}`}
                    onChange={() => handleCheckboxSizes(el?.size)}
                  />
                  <label
                    htmlFor={`checkbox-${el?.id}`}
                    className='text-sm flex cursor-pointer mm:items-center w-max'
                  >
                    <div
                      className={`${
                        selectedSizes?.includes(el?.size) && 'bg-black'
                      } w-4 h-4 min-w-[16px] mr-2 flex justify-center items-center border border-black rounded-sm`}
                    >
                      {selectedSizes?.includes(el?.size) && (
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          xmlnsXlink='http://www.w3.org/1999/xlink'
                          width='20'
                          height='20'
                          viewBox='0 0 30 30.000001'
                          version='1.0'
                        >
                          <defs>
                            <clipPath id='id1'>
                              <path d='M 2.328125 4.222656 L 27.734375 4.222656 L 27.734375 24.542969 L 2.328125 24.542969 Z M 2.328125 4.222656 ' />
                            </clipPath>
                          </defs>
                          <g clipPath='url(#id1)'>
                            <path
                              fill='#FFF'
                              d='M 27.5 7.53125 L 24.464844 4.542969 C 24.15625 4.238281 23.65625 4.238281 23.347656 4.542969 L 11.035156 16.667969 L 6.824219 12.523438 C 6.527344 12.230469 6 12.230469 5.703125 12.523438 L 2.640625 15.539062 C 2.332031 15.84375 2.332031 16.335938 2.640625 16.640625 L 10.445312 24.324219 C 10.59375 24.472656 10.796875 24.554688 11.007812 24.554688 C 11.214844 24.554688 11.417969 24.472656 11.566406 24.324219 L 27.5 8.632812 C 27.648438 8.488281 27.734375 8.289062 27.734375 8.082031 C 27.734375 7.875 27.648438 7.679688 27.5 7.53125 Z M 27.5 7.53125 '
                              fillOpacity='1'
                              fillRule='nonzero'
                            />
                          </g>
                        </svg>
                      )}
                    </div>
                    <p>{el?.size}</p>
                  </label>
                </div>
              ))}
            </div>

            <div
              onClick={() => toggleFilter('costs')}
              className='flex justify-between items-center pt-5 pb-2 cursor-pointer'
            >
              <span className='font-semibold'>Цена</span>
              <img
                className={`${
                  isShowFilter?.costs && 'rotate-[180deg]'
                } w-3 duration-200`}
                src={arrowDown}
                alt='*'
              />
            </div>
            <div
              className={`${
                costs?.length > 5 && 'overflow-y-scroll scrollable h-[172px]'
              } ${
                isShowFilter?.costs ? 'block' : 'hidden'
              } space-y-3 pb-5 border-b border-colGray2`}
            >
              {costs?.map((el, index) => (
                <div key={index}>
                  <input
                    className='hidden'
                    type='checkbox'
                    id={`checkbox-${el?.id}`}
                    onChange={(e) =>
                      handleCheckboxCosts(
                        el.minCost,
                        el.maxCost,
                        e.target.checked
                      )
                    }
                  />
                  <label
                    htmlFor={`checkbox-${el?.id}`}
                    className='text-sm flex cursor-pointer mm:items-center w-max'
                  >
                    <div
                      className={`${
                        selectedCosts.some(
                          (cost) =>
                            cost?.minCost === el.minCost &&
                            cost?.maxCost === el.maxCost
                        ) && 'bg-black'
                      } w-4 h-4 min-w-[16px] mr-2 flex justify-center items-center border border-black rounded-sm`}
                    >
                      {selectedCosts?.some(
                        (cost) =>
                          cost?.minCost === el.minCost &&
                          cost?.maxCost === el.maxCost
                      ) && (
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          xmlnsXlink='http://www.w3.org/1999/xlink'
                          width='20'
                          height='20'
                          viewBox='0 0 30 30.000001'
                          version='1.0'
                        >
                          <defs>
                            <clipPath id='id1'>
                              <path d='M 2.328125 4.222656 L 27.734375 4.222656 L 27.734375 24.542969 L 2.328125 24.542969 Z M 2.328125 4.222656 ' />
                            </clipPath>
                          </defs>
                          <g clipPath='url(#id1)'>
                            <path
                              fill='#FFF'
                              d='M 27.5 7.53125 L 24.464844 4.542969 C 24.15625 4.238281 23.65625 4.238281 23.347656 4.542969 L 11.035156 16.667969 L 6.824219 12.523438 C 6.527344 12.230469 6 12.230469 5.703125 12.523438 L 2.640625 15.539062 C 2.332031 15.84375 2.332031 16.335938 2.640625 16.640625 L 10.445312 24.324219 C 10.59375 24.472656 10.796875 24.554688 11.007812 24.554688 C 11.214844 24.554688 11.417969 24.472656 11.566406 24.324219 L 27.5 8.632812 C 27.648438 8.488281 27.734375 8.289062 27.734375 8.082031 C 27.734375 7.875 27.648438 7.679688 27.5 7.53125 Z M 27.5 7.53125 '
                              fillOpacity='1'
                              fillRule='nonzero'
                            />
                          </g>
                        </svg>
                      )}
                    </div>
                    <p>
                      {' '}
                      от {el?.minCost} до {el?.maxCost}
                    </p>
                  </label>
                </div>
              ))}
            </div>

            <div
              onClick={() => toggleFilter('brands')}
              className='flex justify-between items-center pt-5 pb-2 cursor-pointer'
            >
              <span className='font-semibold'>Бренды</span>
              <img
                className={`${
                  isShowFilter?.brands && 'rotate-[180deg]'
                } w-3 duration-200`}
                src={arrowDown}
                alt='*'
              />
            </div>
            <div
              className={`${
                brands?.length > 5 && 'overflow-y-scroll scrollable h-[172px]'
              } ${isShowFilter?.brands ? 'block' : 'hidden'} space-y-3 pb-3`}
            >
              {brands?.map((el) => (
                <div key={el?.id}>
                  <input
                    className='hidden'
                    type='checkbox'
                    id={`checkbox-${el?.id}`}
                    onChange={() => handleCheckboxBrands(el?.id)}
                  />
                  <label
                    htmlFor={`checkbox-${el?.id}`}
                    className='text-sm flex cursor-pointer mm:items-center w-max'
                  >
                    <div
                      className={`${
                        selectedBrands?.includes(el?.id) && 'bg-black'
                      } w-4 h-4 min-w-[16px] mr-2 flex justify-center items-center border border-black rounded-sm`}
                    >
                      {selectedBrands?.includes(el?.id) && (
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          xmlnsXlink='http://www.w3.org/1999/xlink'
                          width='20'
                          height='20'
                          viewBox='0 0 30 30.000001'
                          version='1.0'
                        >
                          <defs>
                            <clipPath id='id1'>
                              <path d='M 2.328125 4.222656 L 27.734375 4.222656 L 27.734375 24.542969 L 2.328125 24.542969 Z M 2.328125 4.222656 ' />
                            </clipPath>
                          </defs>
                          <g clipPath='url(#id1)'>
                            <path
                              fill='#FFF'
                              d='M 27.5 7.53125 L 24.464844 4.542969 C 24.15625 4.238281 23.65625 4.238281 23.347656 4.542969 L 11.035156 16.667969 L 6.824219 12.523438 C 6.527344 12.230469 6 12.230469 5.703125 12.523438 L 2.640625 15.539062 C 2.332031 15.84375 2.332031 16.335938 2.640625 16.640625 L 10.445312 24.324219 C 10.59375 24.472656 10.796875 24.554688 11.007812 24.554688 C 11.214844 24.554688 11.417969 24.472656 11.566406 24.324219 L 27.5 8.632812 C 27.648438 8.488281 27.734375 8.289062 27.734375 8.082031 C 27.734375 7.875 27.648438 7.679688 27.5 7.53125 Z M 27.5 7.53125 '
                              fillOpacity='1'
                              fillRule='nonzero'
                            />
                          </g>
                        </svg>
                      )}
                    </div>
                    <p>{el?.fullname}</p>
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className='flex space-x-3 pb-5 pt-10'>
            <span
              onClick={clearFilter}
              className='w-2/5 h-10 rounded-lg border border-colGray flex justify-center items-center'
            >
              Убрать все
            </span>
            <button className='w-3/5 h-10 rounded-lg border border-black bg-black text-white flex justify-center items-center'>
              Результаты
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ShoesMobFilter;
