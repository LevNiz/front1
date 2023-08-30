import { Parcel } from '../../components';
import { parcel } from '../../constants/parcelData';
import rulesImg from './../../assets/images/rules.svg';

const Tracking = () => {
  return (
    <div className='content py-12'>
      <div className='lg:flex items-center lg:my-6'>
        <div className='lg:max-w-[885px] w-full min-h-[190px] shadow-[rgba(204,_204,_204,_0.40)_0px_10px_20px_0px] rounded-md mx-auto px-4 py-4 sm:px-12 sm:py-6 bg-colYellow'>
          <form>
            <h3 className='text-base sm:text-xl font-medium mb-8'>
              Введите ваш номер, чтобы найти вашу посылку
            </h3>
            <div className='sm:flex'>
              <input
                className='sm:max-w-[405px] w-full px-4 h-[42px] rounded-[10px] shadow-md text-base focus:outline-none'
                type='text'
                placeholder='Ваш номер'
              />
              <button className='bg-black text-white w-full mt-4 sm:mt-0 sm:ml-5 h-[42px] font-medium rounded-lg hover:opacity-80 duration-100'>
                Отследить
              </button>
            </div>
          </form>
        </div>
        <div className='max-w-[380px] h-[130px] hidden rounded-[10px] lg:flex justify-center items-center w-full bg-colPurple mt-0 py-4 px-6 lg:ml-10 text-center'>
          <img src={rulesImg} alt='*' />
          <p className='text-xl font-medium text-white ml-3'>
            Инструкция к оформлению нового заказа
          </p>
        </div>
      </div>
      <h3 className='text-2xl sm:text-4xl font-semibold pb-4 pt-14 lg:py-16 text-center'>
        Мои текущие посылки
      </h3>
      <div className='flex justify-center'>
        <div className='max-w-[991px] w-full flex flex-col space-y-8'>
          <Parcel parcel={parcel} />
        </div>
      </div>
    </div>
  );
};

export default Tracking;
