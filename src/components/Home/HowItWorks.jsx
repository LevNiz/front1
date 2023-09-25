import bgImage from './../../assets/images/how-it-works.jpg';

const HowItWorks = () => {
  return (
    <div
      className='min-h-[400px] bg-black bg-center bg-cover bg-no-repeat text-white py-10'
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className='flex justify-center mb-5'>
        <div className="flex relative bg-[#E8E8E8] w-max pr-2 rounded-sm">
          <span className='absolute w-1 h-full bg-colYellow'></span>
          <h6 className='ml-3'>Процесс работы</h6>
        </div>
      </div>
      <h1 className='text-3xl sm:text-[40px] font-medium text-center sm:mt-8'>
        Как это работает
      </h1>
      <div className='md:flex-row flex-col flex justify-between mt-12 content space-y-5 md:space-y-0 md:space-x-5'>
        <div className='flex max-w-[415px] w-full'>
          <h1 className='text-3xl md:text-4xl lg:text-6xl font-bold mb-2'>
            1.
          </h1>
          <div className='ml-3 md:ml-5'>
            <h3 className='text-2xl md:text-3xl mb-3 lg:text-[40px] font-bold lg:pt-2'>
              Заказ
            </h3>
            <p className='text-base lg:text-xl font-medium'>
              Заказ можете осуществить через сайт либо наше приложение
            </p>
          </div>
        </div>
        <div className='flex max-w-[415px] w-full'>
          <h1 className='text-3xl md:text-4xl lg:text-6xl font-bold mb-2'>
            2.
          </h1>
          <div className='ml-3 md:ml-5'>
            <h3 className='text-2xl md:text-3xl mb-3 lg:text-[40px] font-bold lg:pt-2'>
              Ожидание
            </h3>
            <p className='text-base lg:text-xl font-medium'>
              Срок доставки почты от 3 до 10 дней{' '}
            </p>
          </div>
        </div>
        <div className='flex max-w-[415px] w-full'>
          <h1 className='text-3xl md:text-4xl lg:text-6xl font-bold mb-2'>
            3.
          </h1>
          <div className='ml-3 md:ml-5'>
            <h3 className='text-2xl md:text-3xl mb-3 lg:text-[40px] font-bold lg:pt-2'>
              Доставка
            </h3>
            <p className='text-base lg:text-xl font-medium'>
              Доставляем прямо к вашему дому
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
