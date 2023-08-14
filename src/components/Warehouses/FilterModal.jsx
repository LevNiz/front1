import { useEffect } from 'react';
import { useState } from 'react';
import { warehouses } from '../../constants/wareHouseData';
import back from './../../assets/icons/arrow-left.svg';

// eslint-disable-next-line react/prop-types
const FilterModal = ({ isOpen, onClose }) => {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedParcel, setSelectedParcel] = useState('');

  const [completedCountries, setCompletedCountries] = useState();
  const [completedCities, setCompletedCities] = useState();
  const [completedTimes, setCompletedTimes] = useState();

  useEffect(() => {
    const mappedCountries = warehouses?.map((el) => ({
      id: el?.id,
      label: el?.country,
    }));
    const mappedCities = warehouses?.map((el) => ({
      id: el?.id,
      label: el?.city,
    }));
    const mappedTimes = warehouses?.map((el) => ({
      id: el?.id,
      label: el?.workTime,
    }));
    setCompletedCountries(mappedCountries);
    setCompletedCities(mappedCities);
    setCompletedTimes(mappedTimes);
  }, []);

  if (!isOpen) return null;

  return (
    <>
      <form className='fixed w-full h-screen sm:h-auto sm:absolute top-0 left-0 xl:left-[7%] bg-white p-4 sm:p-6 md:p-10 pt-6 z-[9999] max-w-[890px] sm:rounded-[20px] shadow-[0px_10px_20px_0px_rgba(204,_204,_204,_0.40)]'>
        <div className='flex justify-between sm:justify-end'>
          <div onClick={() => onClose()}>
            <img src={back} alt='*' />
          </div>
          <span
            onClick={() => onClose()}
            className='cursor-pointer font-medium'
          >
            Сбросить
          </span>
        </div>
        <div className='grid sm:grid-cols-2 sm:gap-5 md:gap-8 sm:mt-0 xs:mt-8 mt-0'>
          <div className='relative'>
            <p className='mt-5 sm:mt-0 text-base font-medium mb-2'>Страна</p>
            <select
              className='appearance-none w-full bg-colBgGray2 py-3 px-4 pr-8 rounded-[10px] focus:outline-none '
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
            >
              <option value=''>Выберите страну</option>
              {completedCountries.map((el) => (
                <option key={el.id} value={el.id}>
                  {el.label}
                </option>
              ))}
            </select>
            <div className='pointer-events-none absolute top-[40%] inset-y-0 right-0 flex items-center px-2 text-gray-700'>
              <svg
                className='fill-current h-4 w-4'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
              >
                <path
                  fillRule='evenodd'
                  d='M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z'
                  clipRule='evenodd'
                />
              </svg>
            </div>
          </div>
          <div className='relative'>
            <p className='mt-5 sm:mt-0 text-base font-medium mb-2'>Город</p>
            <select
              className='appearance-none w-full bg-colBgGray2 py-3 px-4 pr-8 rounded-[10px] focus:outline-none '
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              <option value=''>Выберите город</option>
              {completedCities.map((el) => (
                <option key={el.id} value={el.id}>
                  {el.label}
                </option>
              ))}
            </select>
            <div className='pointer-events-none absolute top-[40%] inset-y-0 right-0 flex items-center px-2 text-gray-700'>
              <svg
                className='fill-current h-4 w-4'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
              >
                <path
                  fillRule='evenodd'
                  d='M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z'
                  clipRule='evenodd'
                />
              </svg>
            </div>
          </div>
          <div className='relative'>
            <p className='mt-5 sm:mt-0 text-base font-medium mb-2'>
              Приём посылок
            </p>
            <select
              className='appearance-none w-full bg-colBgGray2 py-3 px-4 pr-8 rounded-[10px] focus:outline-none '
              value={selectedParcel}
              onChange={(e) => setSelectedParcel(e.target.value)}
            >
              <option value=''>{`</> 30 кг`}</option>
              {completedCountries.map((el) => (
                <option key={el.id} value={el.id}>
                  {el.label}
                </option>
              ))}
            </select>
            <div className='pointer-events-none absolute top-[40%] inset-y-0 right-0 flex items-center px-2 text-gray-700'>
              <svg
                className='fill-current h-4 w-4'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
              >
                <path
                  fillRule='evenodd'
                  d='M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z'
                  clipRule='evenodd'
                />
              </svg>
            </div>
          </div>
          <div className='relative'>
            <p className='mt-5 sm:mt-0 text-base font-medium mb-2'>
              Рабочие часы
            </p>
            <select
              className='appearance-none w-full bg-colBgGray2 py-3 px-4 pr-8 rounded-[10px] focus:outline-none '
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
            >
              <option value=''>Выходные</option>
              {completedTimes.map((el) => (
                <option key={el.id} value={el.id}>
                  {el.label}
                </option>
              ))}
            </select>
            <div className='pointer-events-none absolute top-[40%] inset-y-0 right-0 flex items-center px-2 text-gray-700'>
              <svg
                className='fill-current h-4 w-4'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
              >
                <path
                  fillRule='evenodd'
                  d='M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z'
                  clipRule='evenodd'
                />
              </svg>
            </div>
          </div>
        </div>
        <div className='text-center'>
          <button
            onClick={(e) => {
              e.preventDefault();
              onClose();
            }}
            className='sm:max-w-[330px] w-full bg-black text-white sm:text-black sm:bg-colYellow h-12 mt-6 sm:mt-12 rounded-lg hover:bg-colYellowHover duration-100'
          >
            Применить
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
