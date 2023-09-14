import { useEffect } from 'react';
import { useState } from 'react';
import { fetchCities, fetchCountries } from '../../api/tempAPI';
import back from './../../assets/icons/arrow-left.svg';
import Select from 'react-select';
import { Controller, useForm } from 'react-hook-form';
import ReactFlagsSelect from 'react-flags-select';
import { filterDepot } from '../../api/depots';
import { ButtonLoading } from '../../helpers/Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';

// eslint-disable-next-line react/prop-types
const FilterModal = ({ isOpen, onClose }) => {
  const { loading } = useSelector((state) => state?.depots);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);

  const { control, register, setValue, watch, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const fetchData = async (fetchFunction, setDataFunction) => {
    const { success, data } = await fetchFunction();
    if (success) {
      setDataFunction(data);
    }
  };

  useEffect(() => {
    fetchData(fetchCountries, setCountries);
    fetchData(fetchCities, setCities);
  }, []);

  const onSubmit = async (data) => {
    await filterDepot(data, dispatch);
    onClose();
  };

  const clearFilter = async () => {
    setValue('country', '');
    setValue('city', '');
    setValue('maxAmountStart', '');
    setValue('maxAmountEnd', '');
  };

  const countrySelect = watch('country');
  const countryNamesInRussian = {};

  countries.forEach((country) => {
    countryNamesInRussian[country?.code] = country.nameRu;
  });

  const filteredCities = cities?.filter(
    (el) => el?.country?.code === selectedCountry
  );

  const cityOptions = filteredCities?.map((el) => ({
    value: el?.id,
    label: el?.nameRu,
  }));

  if (!isOpen) return null;

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='fixed w-full h-screen sm:h-auto sm:absolute top-0 left-0 xl:left-[7%] bg-white p-4 sm:p-6 md:p-10 pt-6 z-[9999] max-w-[890px] sm:rounded-[20px] shadow-[0px_10px_20px_0px_rgba(204,_204,_204,_0.40)]'
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
              defaultValue=''
              render={({ field }) => (
                <ReactFlagsSelect
                  className='filterSelect'
                  selected={field.value?.code}
                  onSelect={(selectedOption) => {
                    field.onChange(selectedOption);
                    const selectedCountryObject = countries?.find(
                      (country) => country?.code === selectedOption
                    );

                    if (selectedCountryObject) {
                      setValue('country', selectedCountryObject);
                    }
                    setSelectedCountry(selectedOption);
                    setValue('city', '');
                  }}
                  countries={countries?.map((country) => country?.code)}
                  customLabels={countryNamesInRussian}
                  placeholder='Выберите страну'
                  searchable={true}
                  searchPlaceholder='Поиск...'
                  customStyle={{
                    padding: '11px 20px !important',
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
              defaultValue=''
              render={({ field }) => (
                <Select
                  {...field}
                  options={cityOptions}
                  className='filterSelect'
                  placeholder='Выберите город'
                  isDisabled={!countrySelect}
                  onChange={(selectedOption) => {
                    field.onChange(selectedOption);
                  }}
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      padding: '8px',
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
              className='appearance-none w-full bg-colBgGray2 py-3 px-4 pr-8 rounded-[10px] focus:outline-none'
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
              className='appearance-none w-full bg-colBgGray2 py-3 px-4 pr-8 rounded-[10px] focus:outline-none'
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
