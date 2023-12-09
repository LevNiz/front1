import errorImg from '../../assets/images/error.png';

export const ErrorServer = () => {
  return (
    <div className='py-4 text-center'>
      <img className='w-3/5 sm:w-48 mx-auto pb-2' src={errorImg} alt='*' />
      <h1 className='font-medium text-xl'>Что-то пошло не так!</h1>
      <p className='opacity-50 text-base'>Повторите попытку еще раз.</p>
    </div>
  );
};
