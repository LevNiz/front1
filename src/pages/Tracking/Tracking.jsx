import { useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchSearchParcel } from '../../api/parcels';
import { AuthParcel, UnAuthParcel } from '../../components';
import { ContentLoading } from '../../helpers/Loader/Loader';
import rulesImg from './../../assets/images/rules.svg';
import notFound from './../../assets/images/404.svg';
import { useForm } from 'react-hook-form';

const Tracking = () => {
  const [findParcel, setFindParcel] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSearched, setIsSearched] = useState(false);

  const user = useSelector((state) => state?.user?.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    const { success, parcelData } = await fetchSearchParcel(data.orderNumber);
    if (success) {
      setFindParcel(parcelData);
      setLoading(false);
      setIsSearched(true);
    }
    setLoading(false);
  };

  return (
    <div className='content py-12'>
      <div className='lg:flex items-center lg:my-6'>
        <div className='lg:max-w-[885px] w-full min-h-[190px] shadow-[rgba(204,_204,_204,_0.40)_0px_10px_20px_0px] rounded-md mx-auto px-4 py-4 sm:px-12 sm:py-6 bg-colYellow'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h3 className='text-base sm:text-xl font-medium mb-8'>
              Введите ваш номер, чтобы найти вашу посылку
            </h3>
            <div className='sm:flex'>
              <input
                className='sm:max-w-[405px] w-full px-4 h-[42px] rounded-[10px] shadow-md text-base focus:outline-none'
                placeholder='Ваш номер'
                {...register('orderNumber', {
                  required: 'Поле обязательно к заполнению!',
                })}
              />
              <button
                type='submit'
                className='bg-black text-white w-full mt-4 sm:mt-0 sm:ml-5 h-[42px] font-medium rounded-lg hover:opacity-80 duration-100'
              >
                Отследить
              </button>
            </div>
            {errors?.orderNumber && (
              <p className='text-red-500 mt-3 text-sm'>
                {errors?.orderNumber.message || 'Error!'}
              </p>
            )}
          </form>
        </div>
        <div className='max-w-[380px] h-[130px] hidden rounded-[10px] lg:flex justify-center items-center w-full bg-colPurple mt-0 py-4 px-6 lg:ml-10 text-center'>
          <img src={rulesImg} alt='*' />
          <p className='text-xl font-medium text-white ml-3'>
            Инструкция к оформлению нового заказа
          </p>
        </div>
      </div>
      <h3
        className={`${
          user ? '' : 'hidden'
        } text-2xl sm:text-4xl font-semibold pb-4 pt-14 lg:py-16 text-center`}
      >
        Мои текущие посылки
      </h3>
      {loading ? (
        <ContentLoading />
      ) : (
        <div className='flex justify-center my-10'>
          <div className='max-w-[991px] w-full flex flex-col space-y-8'>
            {user ? (
              <AuthParcel />
            ) : isSearched && findParcel?.length === 0 ? (
              <div className='py-10'>
                <img className='mx-auto' src={notFound} alt='*' />
                <h4 className='text-center font-medium mt-5 text-xl'>
                  По вашему запросу ничего не нашли...
                </h4>
              </div>
            ) : (
              <UnAuthParcel findParcel={findParcel} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Tracking;
