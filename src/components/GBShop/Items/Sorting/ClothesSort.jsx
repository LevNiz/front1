import { useState } from 'react';
import Select from 'react-select';
import { genderType, ordering } from '../../../../constants/fakeFilterData';
import search from '../../../../assets/icons/search2.svg';

const ClothesSort = () => {
  const [formData, setFormData] = useState({
    gender_type: '',
    ordering: '',
    search: '',
  });

  const handleChange = (fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className='flex space-x-4 items-center'>
      <form
        onSubmit={handleSubmitSearch}
        className='max-w-[240px] w-full relative'
      >
        <input
          type='text'
          placeholder='Поиск'
          onChange={(e) => handleChange('search', e.target.value)}
          className='border border-colGray2 pl-[10px] w-full focus:border-black outline-none h-[42px] rounded-lg pr-10'
        />
        <img
          className='absolute top-1/2 -translate-y-1/2 right-3'
          src={search}
          alt='*'
        />
      </form>
      <div className='max-w-[260px] w-full'>
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
      <div className='max-w-[260px] w-full'>
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

export default ClothesSort;
