import arrowDown from '../../../../assets/icons/down.svg';
import { useEffect, useState } from 'react';
import { costs, sizes } from '../../../../constants/fakeFilterData';
import { fetchFilteredBrands } from '../../../../api/gb-shop/brands';

const ClothesFilter = ({ categoryID }) => {
  const [isShowFilter, setIsShowFilter] = useState({
    sizes: true,
    costs: true,
    brands: true,
  });
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedCosts, setSelectedCosts] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [brands, setBrands] = useState([]);

  const handleCheckboxSizes = (size) => {
    if (selectedSizes?.includes(size)) {
      setSelectedSizes(
        selectedSizes?.filter((selectedSize) => selectedSize !== size)
      );
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };

  const handleCheckboxCosts = (minCost, maxCost, isChecked) => {
    if (isChecked) {
      setSelectedCosts([...selectedCosts, { minCost, maxCost }]);
    } else {
      setSelectedCosts(
        selectedCosts?.filter(
          (cost) => cost?.minCost !== minCost || cost?.maxCost !== maxCost
        )
      );
    }
  };

  const handleCheckboxBrands = (id) => {
    if (selectedBrands?.includes(id)) {
      setSelectedBrands(
        selectedBrands?.filter((selectedBrands) => selectedBrands !== id)
      );
    } else {
      setSelectedBrands([...selectedBrands, id]);
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

  return (
    <form className='pr-4'>
      <div className='pr-3'>
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
            sizes?.length > 5 && 'overflow-y-scroll scrollable h-[172px]'
          } ${
            isShowFilter?.sizes ? 'block' : 'hidden'
          } space-y-3 pb-5 border-b border-colGray2`}
        >
          {sizes?.map((el, index) => (
            <div key={index}>
              <input
                className='hidden'
                type='checkbox'
                id={`checkbox-${el?.id}-${index}`}
                checked={selectedSizes.includes(el?.size)}
                onChange={() => handleCheckboxSizes(el?.size)}
              />
              <label
                htmlFor={`checkbox-${el?.id}-${index}`}
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
                id={`checkbox-${el?.id}-${index}`}
                checked={selectedCosts.some(
                  (cost) =>
                    cost?.minCost === el.minCost && cost?.maxCost === el.maxCost
                )}
                onChange={(e) =>
                  handleCheckboxCosts(el.minCost, el.maxCost, e.target.checked)
                }
              />
              <label
                htmlFor={`checkbox-${el?.id}-${index}`}
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
          {brands?.map((el, index) => (
            <div key={index}>
              <input
                className='hidden'
                type='checkbox'
                id={`checkbox-${el?.id}-${index}`}
                checked={selectedBrands?.includes(el?.id)}
                onChange={() => handleCheckboxBrands(el?.id)}
              />
              <label
                htmlFor={`checkbox-${el?.id}-${index}`}
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
    </form>
  );
};

export default ClothesFilter;
