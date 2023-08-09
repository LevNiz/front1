import { useEffect } from 'react';
import { useState } from 'react';
import { warehouses } from '../../../constants/wareHouseData';

// eslint-disable-next-line react/prop-types
const FilterParcel = ({ isOpen, onClose }) => {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

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
    <div>
      <form className='absolute top-0 left-0 bg-white p-10 pt-6 pb-10 z-10 max-w-[890px] rounded-[20px] w-full shadow-[0px_10px_20px_0px_rgba(204,_204,_204,_0.40)]'>
        <div className='flex justify-end'>
          <span className='cursor-pointer'>Сбросить</span>
        </div>
        <div className='flex justify-between pr-8'>
          <div className='max-w-[340px] w-full'>
            <h3 className='text-xl font-semibold mb-3'>Место отправки</h3>
            <div className='relative w-full mb-5'>
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
              <div className='pointer-events-none absolute top-[15%] inset-y-0 right-0 flex items-center px-2 text-gray-700'>
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
            <div className='relative w-full'>
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
              <div className='pointer-events-none absolute top-[15%] inset-y-0 right-0 flex items-center px-2 text-gray-700'>
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
          <div className='max-w-[340px] w-full'>
            <h3 className='text-xl font-semibold mb-3'>Место прибытия</h3>
            <div className='relative w-full mb-5'>
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
              <div className='pointer-events-none absolute top-[15%] inset-y-0 right-0 flex items-center px-2 text-gray-700'>
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
            <div className='relative w-full'>
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
              <div className='pointer-events-none absolute top-[15%] inset-y-0 right-0 flex items-center px-2 text-gray-700'>
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
        </div>
        <h3 className='text-xl font-semibold mb-3 mt-5'>Время</h3>
        <div className='flex justify-between pr-8'>
          <div className='max-w-[340px] w-full'>
            <div className='relative'>
              <select
                className='appearance-none w-full bg-colBgGray2 py-3 px-4 pr-8 rounded-[10px] focus:outline-none '
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
              >
                <option value=''>Выберите дату</option>
                {completedTimes.map((el) => (
                  <option key={el.id} value={el.id}>
                    {el.label}
                  </option>
                ))}
              </select>
              <div className='pointer-events-none absolute top-[15%] inset-y-0 right-0 flex items-center px-2 text-gray-700'>
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
          <div className='max-w-[340px] w-full'>
            <button
              onClick={(e) => {
                e.preventDefault();
                onClose();
              }}
              className='max-w-[330px] w-full bg-colYellow h-12 rounded-lg hover:bg-colYellowHover duration-100'
            >
              Применить
            </button>
          </div>
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