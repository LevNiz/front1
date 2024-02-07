import Select from 'react-select';
import kgFlag from '../../../assets/tempImages/kgz.png';
import { currencyData } from '../../../constants/currency';

const ExchangeRate = () => {
  return (
    <div>
      <h2 className='font-medium text-center text-xl mb-2'>Курсы валют</h2>
      <div className='flex justify-between items-center py-2'>
        <span className='text-lg'>Выберите валюту</span>
        <Select
          options={[
            {
              id: 1,
              countryFlag: kgFlag,
              currencyName: 'KGZ',
            },
          ]}
          className='sm:max-w-[140px] w-full outline-none'
          defaultValue={{
            id: 1,
            countryFlag: kgFlag,
            currencyName: 'KGZ',
          }}
          isSearchable={false}
          getOptionLabel={(option) => (
            <div className='flex items-center'>
              <img src={option.countryFlag} alt='*' />
              <span className='pl-2'>{option.currencyName}</span>
            </div>
          )}
          getOptionValue={(option) => option?.id}
          styles={{
            control: (provided, state) => ({
              ...provided,
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
      </div>
      <div className='flex justify-between items-center py-1'>
        <span className='text-sm text-gray-700'>Текущий курс</span>
        <span className='text-sm text-colGray3'>Обновление 05.02.2024</span>
      </div>
      <div className='flex justify-between items-center pt-2'>
        <h4 className='text-lg font-medium w-1/3'>Валюта</h4>
        <h4 className='text-lg font-medium w-1/3 text-center'>Купля</h4>
        <h4 className='text-lg font-medium w-1/3 text-right'>Продажа</h4>
      </div>
      <div className='space-y-2'>
        {currencyData?.map((el) => (
          <div key={el?.id} className='flex justify-between items-center pt-2'>
            <div className='flex w-1/3'>
              <div className='min-w-[28px] w-7 h-5 overflow-hidden mr-2'>
                <img
                  className='w-full h-full object-contain'
                  src={el?.flag}
                  alt='*'
                />
              </div>
              <span>{el?.currency}</span>
            </div>
            <span className='w-1/3 text-center'>{el?.purchase}</span>
            <span className='w-1/3 text-right'>{el?.sale}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExchangeRate;
