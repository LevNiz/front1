import bgImage from './../../assets/images/how-it-works.jpg';

const HowItWorks = () => {
  return (
    <div
      className='min-h-[400px] bg-black bg-center bg-cover bg-no-repeat text-white py-10'
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <h1 className='text-[40px] font-medium text-center'>
        [ Как это работает ]
      </h1>
      <div className='flex justify-between mt-12 content space-x-5'>
        <div className='flex max-w-[415px] w-full'>
          <h1 className='text-[64px] font-bold'>1.</h1>
          <div className='ml-5'>
            <h3 className='text-[40px] font-bold pt-2'>Заказ</h3>
            <p className='text-xl font-medium'>Заказ можете осуществить через сайт либо наше приложение</p>
          </div>
        </div>
        <div className='flex max-w-[415px] w-full'>
          <h1 className='text-[64px] font-bold'>2.</h1>
          <div className='ml-5'>
            <h3 className='text-[40px] font-bold pt-2'>Ожидание</h3>
            <p className='text-xl font-medium'>Срок доставки почты от 3 до 10 дней </p>
          </div>
        </div>
        <div className='flex max-w-[415px] w-full'>
          <h1 className='text-[64px] font-bold'>3.</h1>
          <div className='ml-5'>
            <h3 className='text-[40px] font-bold pt-2'>Доставка</h3>
            <p className='text-xl font-medium'>Доставляем прямо к вашему дому</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
