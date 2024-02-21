import icon1 from './../../assets/icons/how-works1.svg';
import icon2 from './../../assets/icons/how-works2.svg';
import icon3 from './../../assets/icons/how-works3.svg';
import line1 from './../../assets/icons/how-works-line1.svg';
import line2 from './../../assets/icons/how-works-line2.svg';

const HowItWorks = () => {
  return (
    <div className='min-h-[400px] bg-colBgGray3 bg-center bg-cover bg-no-repeat py-16'>
      <div className='flex justify-center mb-5'>
        <div className='flex relative bg-[#E8E8E8] w-max pr-2 rounded-sm'>
          <span className='absolute w-1 h-full bg-colYellow'></span>
          <h6 className='ml-3'>Процесс работы</h6>
        </div>
      </div>
      <h1 className='text-3xl sm:text-[40px] font-medium text-center sm:mt-8'>
        Как это работает
      </h1>
      <div className='md:flex-row flex-col items-center flex justify-between mt-24 content space-y-5 md:space-y-0'>
        <div className='max-w-[280px] md:min-h-[260px] mm:mr-[270px] md:mr-0 w-full text-center'>
          <img className='mx-auto' src={icon1} alt='*' />
          <div className='mt-5'>
            <h3 className='text-2xl md:text-3xl mb-3 lg:text-[40px] font-bold lg:pt-2'>
              Заказ
            </h3>
            <p className='text-base lg:text-xl'>
              Заказ можете осуществить через сайт либо наше приложение
            </p>
          </div>
        </div>
        <div>
          <img
            className='my-16 md:my-0 mm:rotate-0 rotate-[40deg]'
            src={line1}
            alt='*'
          />
        </div>
        <div className='max-w-[280px] md:min-h-[260px] mm:ml-[270px] md:ml-0 w-full text-center'>
          <img className='mx-auto' src={icon2} alt='*' />
          <div className='mt-5'>
            <h3 className='text-2xl md:text-3xl mb-3 lg:text-[40px] font-bold lg:pt-2'>
              Ожидание
            </h3>
            <p className='text-base lg:text-xl'>
              Срок доставки почты от 3 до 10 дней{' '}
            </p>
          </div>
        </div>
        <div>
          <img
            className='my-16 md:my-0 mm:rotate-0 rotate-[90deg]'
            src={line2}
            alt='*'
          />
        </div>
        <div className='max-w-[280px] md:min-h-[260px] mm:mr-[270px] md:mr-0 w-full text-center'>
          <img className='mx-auto' src={icon3} alt='*' />
          <div className='mt-5'>
            <h3 className='text-2xl md:text-3xl mb-3 lg:text-[40px] font-bold lg:pt-2'>
              Доставка
            </h3>
            <p className='text-base lg:text-xl'>
              Доставляем прямо к вашему дому
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
