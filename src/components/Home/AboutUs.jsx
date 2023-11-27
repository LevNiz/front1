import aboutUsImg1 from './../../assets/images/aboutUsImg1.jpg';
import aboutUsImg2 from './../../assets/images/aboutUsImg2.jpg';
import play from './../../assets/images/play.svg';

const AboutUs = () => {
  return (
    <div className='min-h-[850px] pt-14 lg:pt-20 pb-14 md:pb-16 lg:pb-32 content'>
      <div className='flex justify-center mb-5'>
        <div className='flex relative bg-[#E8E8E8] w-max pr-2 rounded-sm'>
          <span className='absolute w-1 h-full bg-colYellow'></span>
          <h6 className='ml-3'>Кто мы есть</h6>
        </div>
      </div>
      <h1 className='text-3xl sm:text-[40px] font-medium text-center pb-10'>
        О компании
      </h1>
      <div className='lg:flex sm:min-h-[520px] mt-12'>
        <div className='w-full lg:w-2/5 min-h-[440px] sm:min-h-[520px] relative'>
          <div className='w-40 h-72 bg-colYellow absolute -top-[40px] xl:right-auto right-0 xl:left-[140px] z-[-1] sm:z-[2]'></div>
          <div className='sm:max-w-[275px] sm:min-w-[275px] height-[308px] sm:absolute top-0 z-[3] pr-10 sm:pr-0 right-[40px] overflow-hidden'>
            <img
              className='sm:w-full h-full object-cover ml-auto'
              src={aboutUsImg1}
              alt='*'
            />
          </div>
          <div className='sm:max-w-[275px] sm:min-w-[275px] mt-[-100px] sm:mt-0 height-[308px] relative sm:absolute sm:bottom-0 mm:right-[240px] lg:right-auto lg:left-0 z-[-1] sm:z-[1] overflow-hidden'>
            <img
              className='sm:w-full h-full object-cover'
              src={aboutUsImg2}
              alt='*'
            />
          </div>
          <div className='w-4/5 sm:w-[190px] rounded-xl h-64 mx-auto sm:h-44 mt-8 sm:mt-0 z-[3] bg-black flex justify-center items-center sm:absolute sm:bottom-0 right-0 overflow-hidden'>
            <img className='cursor-pointer' src={play} alt='*' />
          </div>
        </div>
        <div className='w-full lg:w-3/5 md:pl-6 xl:pl-14 md:pr-12 xl:pr-16 mt-8 md:mt-[3rem] lg:mt-0 md:mb-0 lg:mb-0 flex items-center relative'>
          <p className='text-xl xl:text-2xl font-medium'>
            Мы рады представить Вам наш сервис GivBox по доставке и покупке
            товаров в зарубежных магазинах и маркетплейсах. Вы совершаете
            покупку, а дальше все сделаем мы. Так же для вас предоставляем
            сервис по поиску людей для передачи посылок по пути.
            <br />
            <br />
            Для юридических лиц мы доставляем любые коммерческие грузы под ключ.
            Мы сплоченная команда единомышленников, которая работает с
            удовольствием и интересом.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
