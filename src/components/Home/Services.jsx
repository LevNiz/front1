import service1 from './../../assets/icons/service1.svg';
import service2 from './../../assets/icons/service2.svg';
import service3 from './../../assets/icons/service3.svg';
import service4 from './../../assets/icons/service4.svg';
import service5 from './../../assets/icons/service5.svg';
import service6 from './../../assets/icons/service6.svg';
import service7 from './../../assets/icons/service7.svg';

const Services = () => {
  return (
    <div className='min-h-[540px] py-14 md:py-20 bg-colBgGray3 relative'>
      <div className='content'>
        <div className='flex justify-center mb-5'>
          <div className='flex relative bg-[#E8E8E8] w-max pr-2 rounded-sm text-black'>
            <span className='absolute w-1 h-full bg-colYellow'></span>
            <h6 className='ml-3'>Что мы предлагаем</h6>
          </div>
        </div>
        <h1 className='text-3xl sm:text-[40px] font-medium text-center'>
          Наши услуги
        </h1>
        <div className='flex flex-wrap justify-between md:justify-around mt-16'>
          <div className='md:max-w-[280px] my-3 md:my-10 w-[48%] md:w-full text-center'>
            <img className='mx-auto' src={service1} alt='*' />
            <p className='text-sm mm:text-lg text-[#1C1F35] pt-3'>
              Предоставляем адреса для полкупки в 7 странах
            </p>
          </div>
          <div className='md:max-w-[280px] my-3 md:my-10 w-[48%] md:w-full text-center'>
            <img className='mx-auto' src={service2} alt='*' />
            <p className='text-sm mm:text-lg text-[#1C1F35] pt-3'>
              Доставляем ваши посылки до двери
            </p>
          </div>
          <div className='md:max-w-[280px] my-3 md:my-10 w-[48%] md:w-full text-center'>
            <img className='mx-auto' src={service3} alt='*' />
            <p className='text-sm mm:text-lg text-[#1C1F35] pt-3'>
              Выкупим за вас.
            </p>
          </div>
          <div className='md:max-w-[280px] my-3 md:my-10 w-[48%] md:w-full text-center'>
            <img className='mx-auto' src={service4} alt='*' />
            <p className='text-sm mm:text-lg text-[#1C1F35] pt-3'>
              Найдем попутчика для передачи посылки по пути.
            </p>
          </div>
          <div className='md:max-w-[280px] my-3 md:my-10 w-[48%] md:w-full text-center'>
            <img className='mx-auto' src={service5} alt='*' />
            <p className='text-sm mm:text-lg text-[#1C1F35] pt-3'>
              Всегда работает GB-Shop где вы можете сделать покупки оригинальных
              брендов
            </p>
          </div>
          <div className='md:max-w-[280px] my-3 md:my-10 w-[48%] md:w-full text-center'>
            <img className='mx-auto' src={service6} alt='*' />
            <p className='text-sm mm:text-lg text-[#1C1F35] pt-3'>
              Предоставим GB франшизу и вы сразу сможете заработать
            </p>
          </div>
          <div className='md:max-w-[280px] my-3 md:my-10 w-[48%] md:w-full text-center'>
            <img className='mx-auto' src={service7} alt='*' />
            <p className='text-sm mm:text-lg text-[#1C1F35] pt-3'>
              Осуществляем перевозку коммерческих грузов для Юридических лиц
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
