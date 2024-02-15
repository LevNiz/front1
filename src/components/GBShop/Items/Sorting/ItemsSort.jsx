import { useEffect, useState } from 'react';
import Select from 'react-select';
import { useDispatch } from 'react-redux';
import { genderType, ordering } from '../../../../constants/fakeFilterData';
import search from '../../../../assets/icons/search2.svg';
import { fetchSearchItem, fetchSortItem } from '../../../../api/gb-shop/items';
import filterIcon from '../../../../assets/icons/sort.svg';

const ItemsSort = ({ categoryID, setNextPage, setMobileFilter }) => {
  const [inputValue, setInputValue] = useState('');
  const [selectedValue, setSelectedValue] = useState({
    gender_type: '',
    ordering: '',
  });

  const dispatch = useDispatch();

  const handleSubmitSearch = async (e) => {
    e.preventDefault();
    const { data } = await fetchSearchItem(dispatch, inputValue, categoryID);
    if (data?.next) {
      setNextPage(data?.next);
    } else {
      setNextPage(null);
    }
  };

  const handleChange = async (fieldName, value) => {
    setSelectedValue({
      ...selectedValue,
      [fieldName]: value,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await fetchSortItem(dispatch, categoryID, selectedValue);
      if (data?.next) {
        setNextPage(data.next);
      } else {
        setNextPage(null);
      }
    };

    fetchData();
  }, [selectedValue, dispatch, categoryID, setNextPage]);

  return (
    <div className='flex space-x-2 md:space-x-4 items-center'>
      <form
        onSubmit={(e) => handleSubmitSearch(e)}
        className='md:max-w-[240px] w-full relative'
      >
        <input
          type='text'
          placeholder='Поиск'
          onChange={(e) => setInputValue(e.target.value)}
          className='border border-colGray2 pl-[10px] w-full focus:border-black outline-none h-[42px] rounded-lg pr-10'
        />
        <img
          className='absolute top-1/2 -translate-y-1/2 right-3 cursor-pointer'
          src={search}
          onClick={handleSubmitSearch}
          alt='*'
        />
      </form>
      <button
        onClick={() => setMobileFilter(true)}
        className='md:hidden flex items-center ss:min-w-[110px] bg-white border border-colGray2 outline-none h-[42px] rounded-lg px-3'
      >
        <span className='pr-1 text-colGray ss:block hidden'>Фильтр</span>
        <img className='min-w-[24px]' src={filterIcon} alt='*' />
      </button>
      <div className='hidden md:block max-w-[260px] w-full'>
        <Select
          placeholder='Категория'
          options={genderType?.map((el) => ({
            value: el?.val,
            label: el?.name,
          }))}
          onChange={(selectedOption) =>
            handleChange('gender_type', selectedOption.value)
          }
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
            menuPortal: (provided) => ({ ...provided, zIndex: 9999999 }),
            menu: (provided) => ({ ...provided, position: 'absolute' }),
          }}
        />
      </div>
      <div className='hidden md:block max-w-[260px] w-full'>
        <Select
          placeholder='Сортировка'
          options={ordering?.map((el) => ({
            value: el?.val,
            label: el?.name,
          }))}
          onChange={(selectedOption) =>
            handleChange('ordering', selectedOption.value)
          }
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
            menuPortal: (provided) => ({ ...provided, zIndex: 9999999 }),
            menu: (provided) => ({ ...provided, position: 'absolute' }),
          }}
        />
      </div>
    </div>
  );
};

export default ItemsSort;
