import serviceVector1 from './../../assets/images/service-vector1.png';
import serviceVector2 from './../../assets/images/service-vector2.png';

const Services = () => {
  return (
    <div className='min-h-[540px] py-14 md:py-20 bg-black relative'>
      <img className='absolute bottomC-0 left-0' src={serviceVector1} alt='*' />
      <img className='absolute top-0 right-0' src={serviceVector2} alt='*' />
      <div className='content text-white'>
      <div className='flex justify-center mb-5'>
        <div className="flex relative bg-[#E8E8E8] w-max pr-2 rounded-sm text-black">
          <span className='absolute w-1 h-full bg-colYellow'></span>
          <h6 className='ml-3'>Что мы предлагаем</h6>
        </div>
      </div>
        <h1 className='text-3xl sm:text-[40px] font-medium text-center'>
          Наши услуги
        </h1>
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12'>
          <div className='flex sm:min-h-[96px]'>
            <h3 className='text-2xl font-bold mr-2'>1.</h3>
            <p className='text-xl sm:text-2xl'>
              Предоставляем адреса для полкупки в 7 странах
            </p>
          </div>
          <div className='flex sm:min-h-[96px]'>
            <h3 className='text-2xl font-bold mr-2'>2.</h3>
            <p className='text-xl sm:text-2xl'>
              Доставляем ваши посылки до двери
            </p>
          </div>
          <div className='flex sm:min-h-[96px]'>
            <h3 className='text-2xl font-bold mr-2'>3.</h3>
            <p className='text-xl sm:text-2xl'>Выкупим за вас.</p>
          </div>
          <div className='flex sm:min-h-[96px]'>
            <h3 className='text-2xl font-bold mr-2'>4.</h3>
            <p className='text-xl sm:text-2xl'>
              Найдем попутчика для передачи посылки по пути.
            </p>
          </div>
          <div className='flex sm:min-h-[96px]'>
            <h3 className='text-2xl font-bold mr-2'>5.</h3>
            <p className='text-xl sm:text-2xl'>
              Всегда работает GB-Shop где вы можете сделать покупки оригинальных
              брендов
            </p>
          </div>
          <div className='flex sm:min-h-[96px]'>
            <h3 className='text-2xl font-bold mr-2'>6.</h3>
            <p className='text-xl sm:text-2xl'>
              Предоставим GB франшизу и вы сразу сможете заработать сразу
            </p>
          </div>
          <div className='flex sm:min-h-[96px]'>
            <h3 className='text-2xl font-bold mr-2'>7.</h3>
            <p className='text-xl sm:text-2xl'>
              Осуществляем перевозку коммерческих грузов для Юридических лиц
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
