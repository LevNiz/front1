import { useEffect } from 'react';
import Select from 'react-select';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { ButtonLoading } from '../../helpers/Loader/Loader';
import { fetchCountries } from '../../api/countries';
import { filterBuyer } from '../../api/buyer';
import back from './../../assets/icons/arrow-left.svg';

const FilterModal = ({ isOpen, onClose }) => {
  const { countries } = useSelector((state) => state?.countries);
  const { websites } = useSelector((state) => state?.websites);
  const { loading } = useSelector((state) => state?.buyers);

  const { control, setValue, handleSubmit } = useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await fetchCountries(dispatch);
    })();
  }, []);

  const clearFilter = async () => {
    setValue('country', '');
    setValue('websites', '');
  };

  const onSubmit = async (data) => {
    await filterBuyer(data, dispatch);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='fixed max-w-[480px] w-full h-screen sm:h-auto sm:absolute top-0 right-0 md:right-[30%] bg-white p-4 sm:p-6 md:p-10 pt-6 z-[999999] sm:rounded-[20px] shadow-[0px_10px_20px_0px_rgba(204,_204,_204,_0.40)]'
      >
        <div className='flex justify-between sm:justify-end'>
          <div className='block sm:hidden' onClick={() => onClose()}>
            <img src={back} alt='*' />
          </div>
          <span onClick={clearFilter} className='cursor-pointer font-medium'>
            Сбросить
          </span>
        </div>
        <div className='sm:mt-0 xs:mt-8 mt-0'>
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
            <p className='mt-5 text-base font-medium mb-2'>Сервис</p>
            <Controller
              name='websites'
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  placeholder='Выберите сервис'
                  options={websites?.map((country) => ({
                    value: country?.id,
                    label: (
                      <div key={country?.id} className='flex items-center'>
                        <img
                          src={country?.icon}
                          alt='*'
                          className='w-5 h-4 mr-2'
                        />
                        {country?.name}
                      </div>
                    ),
                  }))}
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
        </div>
        <div className='text-center'>
          <button className='w-full bg-black text-white sm:text-black sm:bg-colYellow h-12 mt-6 sm:mt-12 rounded-lg sm:hover:bg-colYellowHover duration-100'>
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
