import { useEffect, useState } from 'react';
import ReactFlagsSelect from 'react-flags-select';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { fetchFilterMyParcels } from '../../../api/parcels';
import { fetchCities, fetchCountries } from '../../../api/tempAPI';
import jwt_decode from 'jwt-decode';
import back from './../../../assets/icons/arrow-left.svg';
import { ButtonLoading } from '../../../helpers/Loader/Loader';

// eslint-disable-next-line react/prop-types
const FilterParcel = ({ isOpen, onClose }) => {
  const token = useSelector((state) => state?.user?.user?.access);
  const decoded = jwt_decode(token);
  const dispatch = useDispatch();

  const [selectedCountry, setSelectedCountry] = useState('');
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { control, setValue, watch, handleSubmit } = useForm();

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
    setIsLoading(true);
    const { success } = await fetchFilterMyParcels(
      decoded.user_id,
      dispatch,
      data
    );
    if (success) {
      setIsLoading(false);
      onClose();
    }
    onClose();
    setIsLoading(false);
  };

  const senderCountry = watch('senderCountry');
  const receiverCountry = watch('receiverCountry');
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

  const clearFilter = async () => {
    setValue('senderCountry', '');
    setValue('senderCity', '');
    setValue('receiverCountry', '');
    setValue('receiverCity', '');
  };

  if (!isOpen) return null;

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='fixed w-full overflow-y-scroll sm:overflow-y-hidden z-[9999] h-screen sm:h-auto sm:absolute top-0 left-0 bg-white px-3 sm:p-6 pb-6 md:p-10 pt-6 max-w-[890px] sm:rounded-[20px] shadow-[0px_10px_20px_0px_rgba(204,_204,_204,_0.40)]'
      >
        <div className='flex justify-between mb-5'>
          <div className='sm:hidden' onClick={() => onClose()}>
            <img src={back} alt='*' />
          </div>
          <span onClick={clearFilter} className='cursor-pointer mb-3'>
            Сбросить
          </span>
        </div>
        <div className='md:flex justify-between lg:pr-8'>
          <div className='md:max-w-[340px] w-full mr-3'>
            <h3 className='text-xl font-semibold mb-3'>Место отправки</h3>
            <div className='relative w-full mb-5'>
              <Controller
                name='senderCountry'
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
                        setValue('senderCountry', selectedCountryObject);
                      }
                      setSelectedCountry(selectedOption);
                      setValue('senderCity', '');
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
            <div className='relative w-full'>
              <Controller
                name='senderCity'
                control={control}
                defaultValue=''
                render={({ field }) => (
                  <Select
                    {...field}
                    options={cityOptions}
                    className='filterSelect'
                    placeholder='Выберите город'
                    isDisabled={!senderCountry}
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
          </div>
          <div className='md:max-w-[340px] w-full'>
            <h3 className='text-xl font-semibold mt-5 md:mt-0 mb-3'>
              Место прибытия
            </h3>
            <div className='relative w-full mb-5'>
              <Controller
                name='receiverCountry'
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
                        setValue('receiverCountry', selectedCountryObject);
                      }
                      setSelectedCountry(selectedOption);
                      setValue('receiverCity', '');
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
            <div className='relative w-full'>
              <Controller
                name='receiverCity'
                control={control}
                defaultValue=''
                render={({ field }) => (
                  <Select
                    {...field}
                    options={cityOptions}
                    className='filterSelect'
                    placeholder='Выберите город'
                    isDisabled={!receiverCountry}
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
          </div>
        </div>
        <div className='md:max-w-[340px] mt-5 mx-auto w-full'>
          <button
            type='submit'
            className='md:max-w-[330px] w-full bg-colYellow mt-7 md:mt-0 h-12 rounded-lg hover:bg-colYellowHover duration-100'
          >
            {isLoading ? <ButtonLoading /> : 'Применить'}
          </button>
        </div>
      </form>
      <div
        onClick={onClose}
        className='fixed top-0 left-0 w-full h-full z-[1]'
      ></div>
    </div>
  );
};

export default FilterParcel;
