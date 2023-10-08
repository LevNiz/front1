import { useEffect } from 'react';
import { useState } from 'react';
import back from './../../assets/icons/arrow-left.svg';
import Select from 'react-select';
import { Controller, useForm } from 'react-hook-form';
import { filterDepot } from '../../api/depots';
import { ButtonLoading } from '../../helpers/Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCountries } from '../../api/countries';
import { fetchCities } from '../../api/cities';

// eslint-disable-next-line react/prop-types
const FilterModal = ({ isOpen, onClose }) => {
  const { loading } = useSelector((state) => state?.depots);
  const [selectedCountry, setSelectedCountry] = useState('');

  const { cities } = useSelector((state) => state?.cities);
  const { countries } = useSelector((state) => state?.countries);

  const { control, register, setValue, watch, handleSubmit } = useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await fetchCountries(dispatch);
      await fetchCities(dispatch);
    })();
  }, []);

  const clearFilter = async () => {
    setValue('country', '');
    setValue('city', '');
    setValue('maxAmountStart', '');
    setValue('maxAmountEnd', '');
  };

  const countrySelect = watch('country');

  const filteredCities = cities?.filter(
    (el) => el?.country?.id === selectedCountry
  );

  const cityOptions = filteredCities?.map((el) => ({
    value: el?.id,
    label: el?.nameRu,
  }));

  const onSubmit = async (data) => {
    await filterDepot(data, dispatch);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='fixed w-full h-screen sm:h-auto sm:absolute top-0 left-0 xl:left-[7%] bg-white p-4 sm:p-6 md:p-10 pt-6 z-[999999] max-w-[890px] sm:rounded-[20px] shadow-[0px_10px_20px_0px_rgba(204,_204,_204,_0.40)]'
      >
        <div className='flex justify-between sm:justify-end'>
          <div className='block sm:hidden' onClick={() => onClose()}>
            <img src={back} alt='*' />
          </div>
          <span onClick={clearFilter} className='cursor-pointer font-medium'>
            Сбросить
          </span>
        </div>
        <div className='grid sm:grid-cols-2 sm:gap-5 md:gap-8 sm:mt-0 xs:mt-8 mt-0'>
          <div className='relative'>
            <p className='mt-5 sm:mt-0 text-base font-medium mb-2'>Страна</p>
            <Controller
              name='country'
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  placeholder='Выберите страну'
                  options={countries?.map((country) => ({
                    value: country?.id,
                    label: (
                      <div key={country?.id} className='flex items-center'>
                        <img
                          src={country?.icon}
                          alt={country?.nameRu}
                          className='w-5 h-4 mr-2'
                        />
                        {country?.nameRu}
                      </div>
                    ),
                  }))}
                  onChange={(selectedOption) => {
                    setValue('city', '');
                    field.onChange(selectedOption);
                    setSelectedCountry(selectedOption.value);
                  }}
                  styles={{
                    control: (provided, state) => ({
                      ...provided,
                      padding: '8px',
                      boxShadow: state.isFocused ? 0 : 0,
                      border: state.isFocused ? '1px solid #999' : '',
                      '&:hover': {
                        border: state.isFocused ? '1px solid #999' : '',
                      },
                    }),
                  }}
                />
              )}
            />
          </div>
          <div className='relative'>
            <p className='mt-5 sm:mt-0 text-base font-medium mb-2'>Город</p>
            <Controller
              name='city'
              control={control}
              rules={{ required: false }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={cityOptions}
                  placeholder='Выберите город'
                  isDisabled={!countrySelect}
                  onChange={(selectedOption) => {
                    field.onChange(selectedOption);
                  }}
                  styles={{
                    control: (provided, state) => ({
                      ...provided,
                      padding: '8px',
                      boxShadow: state.isFocused ? 0 : 0,
                      border: state.isFocused ? '1px solid #999' : '',
                      '&:hover': {
                        border: state.isFocused ? '1px solid #999' : '',
                      },
                    }),
                  }}
                />
              )}
            />
          </div>
          <div className='relative'>
            <p className='mt-5 sm:mt-0 text-base font-medium mb-2'>
              Минимальный вес
            </p>
            <input
              className='appearance-none w-full border border-gray-300 p-3 min-h-[54px] rounded-[4px] focus:outline-none'
              placeholder='Введите минимальный вес'
              {...register('maxAmountStart', {
                required: false,
              })}
            />
          </div>
          <div className='relative'>
            <p className='mt-5 sm:mt-0 text-base font-medium mb-2'>
              Максимальный вес
            </p>
            <input
              className='appearance-none w-full border border-gray-300 p-3 min-h-[54px] rounded-[4px] focus:outline-none'
              placeholder='Введите максимальный вес'
              {...register('maxAmountEnd', {
                required: false,
              })}
            />
          </div>
        </div>
        <div className='text-center'>
          <button className='sm:max-w-[330px] w-full bg-black text-white sm:text-black sm:bg-colYellow h-12 mt-6 sm:mt-12 rounded-lg sm:hover:bg-colYellowHover duration-100'>
            {loading ? <ButtonLoading /> : 'Применить'}
          </button>
        </div>
      </form>
      <div
        onClick={onClose}
        className='fixed top-0 left-0 w-full h-full z-[1]'
      ></div>
    </>
  );
};

export default FilterModal;
