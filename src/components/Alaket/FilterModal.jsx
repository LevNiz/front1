import { useEffect } from 'react';
import back from './../../assets/icons/arrow-left.svg';
import Select from 'react-select';
import { Controller, useForm } from 'react-hook-form';
import { ButtonLoading } from '../../helpers/Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCountries } from '../../api/countries';
import { fetchCities } from '../../api/cities';
import { filterAlaket } from '../../api/alaket';

const FilterModal = ({ isOpen, onClose }) => {
  const { loading } = useSelector((state) => state?.depots);
  const { cities } = useSelector((state) => state?.cities);

  const { control, register, setValue, handleSubmit } = useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await fetchCountries(dispatch);
      await fetchCities(dispatch);
    })();
  }, [dispatch]);

  const clearFilter = () => {
    setValue('fromCity', '');
    setValue('toCity', '');
    setValue('startDate', '');
    setValue('endDate', '');
  };

  const onSubmit = async (data) => {
    await filterAlaket(data, dispatch);
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
            <p className='mt-5 sm:mt-0 text-base font-medium mb-2'>Из города</p>
            <Controller
              name='fromCity'
              control={control}
              rules={{ required: false }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={cities?.map((el) => ({
                    value: el?.id,
                    label: (
                      <div key={el?.id} className='flex items-center'>
                        <img
                          src={el?.country?.icon}
                          alt='*'
                          className='w-5 mr-2'
                        />
                        {el?.nameRu}
                      </div>
                    ),
                  }))}
                  placeholder='Выберите город'
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
          <div className='relative'>
            <p className='mt-5 sm:mt-0 text-base font-medium mb-2'>В город</p>
            <Controller
              name='toCity'
              control={control}
              rules={{ required: false }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={cities?.map((el) => ({
                    value: el?.id,
                    label: (
                      <div key={el?.id} className='flex items-center'>
                        <img
                          src={el?.country?.icon}
                          alt='*'
                          className='w-5 mr-2'
                        />
                        {el?.nameRu}
                      </div>
                    ),
                  }))}
                  placeholder='Выберите город'
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
          <div className='relative'>
            <p className='mt-5 sm:mt-0 text-base font-medium mb-2'>С</p>
            <input
              className='w-full border border-colGray2 p-[14px] rounded-[4px] focus:border-black focus:outline-none bg-transparent'
              placeholder='Выберите дату'
              type='date'
              {...register('startDate')}
            />
          </div>
          <div className='relative'>
            <p className='mt-5 sm:mt-0 text-base font-medium mb-2'>По</p>
            <input
              className='w-full border border-colGray2 p-[14px] rounded-[4px] focus:border-black focus:outline-none bg-transparent'
              placeholder='Выберите дату'
              type='date'
              {...register('endDate')}
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
