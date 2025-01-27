import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { fetchFilterSavedParcels } from '../../../api/parcels';
import back from './../../../assets/icons/arrow-left.svg';
import { ButtonLoading } from '../../../helpers/Loader/Loader';
import { fetchCountries } from '../../../api/countries';
import { fetchCities } from '../../../api/cities';

const FilterModal = ({ isOpen, onClose }) => {
  const userID = useSelector((state) => state?.user?.userID);
  const dispatch = useDispatch();

  const [selectedCountry, setSelectedCountry] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { cities } = useSelector((state) => state?.cities);
  const { countries } = useSelector((state) => state?.countries);
  const { control, setValue, watch, handleSubmit } = useForm();

  useEffect(() => {
    (async () => {
      await fetchCountries(dispatch);
      await fetchCities(dispatch);
    })();
  }, [dispatch]);

  const senderCountry = watch('senderCountry');
  const receiverCountry = watch('receiverCountry');

  const filteredCities = cities?.filter(
    (el) => el?.country?.id === selectedCountry
  );

  const cityOptions = filteredCities?.map((el) => ({
    value: el?.id,
    label: el?.nameRu,
  }));

  const clearFilter = () => {
    setValue('senderCountry', '');
    setValue('senderCity', '');
    setValue('receiverCountry', '');
    setValue('receiverCity', '');
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    const { success } = await fetchFilterSavedParcels(userID, dispatch, data);
    if (success) {
      setIsLoading(false);
      onClose();
    }
    onClose();
    setIsLoading(false);
  };

  if (!isOpen) return null;

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='fixed w-full overflow-y-scroll sm:overflow-y-hidden h-screen sm:h-auto sm:absolute top-0 left-0 bg-white px-3 py-6 sm:p-6 md:p-10 md:pt-10 max-w-[890px] z-[9999999] sm:rounded-[20px] shadow-[0px_10px_20px_0px_rgba(204,_204,_204,_0.40)]'
      >
        <div className='flex justify-between mb-5'>
          <div className='sm:hidden' onClick={() => onClose()}>
            <img src={back} alt='*' />
          </div>
          <span
            onClick={clearFilter}
            className='cursor-pointer mb-3 font-medium'
          >
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
                render={({ field }) => (
                  <Select
                    {...field}
                    placeholder='Выберите страну'
                    options={countries?.map((country) => ({
                      value: country?.id,
                      label: country?.nameRu,
                    }))}
                    onChange={(selectedOption) => {
                      setValue('city', '');
                      field.onChange(selectedOption);
                      setSelectedCountry(selectedOption.value);
                    }}
                    menuPortalTarget={document.body}
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
                      menuPortal: (provided) => ({
                        ...provided,
                        zIndex: 9999999,
                      }),
                      menu: (provided) => ({
                        ...provided,
                        position: 'absolute',
                      }),
                    }}
                  />
                )}
              />
            </div>
            <div className=' w-full'>
              <Controller
                name='senderCity'
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={cityOptions}
                    placeholder='Выберите город'
                    isDisabled={!senderCountry}
                    onChange={(selectedOption) => {
                      field.onChange(selectedOption);
                    }}
                    menuPortalTarget={document.body}
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
                      menuPortal: (provided) => ({
                        ...provided,
                        zIndex: 9999999,
                      }),
                      menu: (provided) => ({
                        ...provided,
                        position: 'absolute',
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
                render={({ field }) => (
                  <Select
                    {...field}
                    placeholder='Выберите страну'
                    options={countries?.map((country) => ({
                      value: country?.id,
                      label: country?.nameRu,
                    }))}
                    onChange={(selectedOption) => {
                      setValue('city', '');
                      field.onChange(selectedOption);
                      setSelectedCountry(selectedOption.value);
                    }}
                    menuPortalTarget={document.body}
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
                      menuPortal: (provided) => ({
                        ...provided,
                        zIndex: 9999999,
                      }),
                      menu: (provided) => ({
                        ...provided,
                        position: 'absolute',
                      }),
                    }}
                  />
                )}
              />
            </div>
            <div className='relative w-full'>
              <Controller
                name='receiverCity'
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={cityOptions}
                    placeholder='Выберите город'
                    isDisabled={!receiverCountry}
                    onChange={(selectedOption) => {
                      field.onChange(selectedOption);
                    }}
                    menuPortalTarget={document.body}
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
                      menuPortal: (provided) => ({
                        ...provided,
                        zIndex: 9999999,
                      }),
                      menu: (provided) => ({
                        ...provided,
                        position: 'absolute',
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
            className='md:max-w-[330px] w-full text-white bg-black mt-7 md:mt-0 h-12 rounded-lg hover:bg-opacity-80 duration-100'
          >
            {isLoading ? <ButtonLoading /> : 'Применить'}
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
