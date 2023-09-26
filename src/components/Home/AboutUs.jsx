import aboutUsImg1 from './../../assets/images/aboutUsImg1.jpg';
import aboutUsImg2 from './../../assets/images/aboutUsImg2.jpg';
import play from './../../assets/images/play.svg';

const AboutUs = () => {
  return (
    <div className='min-h-[850px] pt-14 lg:pt-20 pb-14 md:pb-32 content'>
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
          <div className='w-40 h-72 bg-colYellow absolute -top-[40px] left-[140px] z-[2]'></div>
          <div className='max-w-[200px] sm:max-w-[275px] sm:min-w-[275px] w-[275px] max-height-[308px] min-height-[308px] absolute top-0 z-[3] right-0 md:right-[40px] overflow-hidden'>
            <img
              className='w-full h-full object-cover'
              src={aboutUsImg1}
              alt='*'
            />
          </div>
          <div className='max-w-[200px] sm:max-w-[275px] sm:min-w-[275px] max-height-[308px] min-height-[308px] absolute bottom-[60px] sm:bottom-0 left-0 sm:left-auto sm:right-[240px] lg:right-auto lg:left-0 z-[1] overflow-hidden'>
            <img
              className='w-full h-full object-cover'
              src={aboutUsImg2}
              alt='*'
            />
          </div>
          <div className='w-[160px] sm:w-[190px] h-[150px] sm:h-[171px] bg-black flex justify-center items-center absolute bottom-[44px] sm:bottom-0 right-0 overflow-hidden'>
            <img className='cursor-pointer' src={play} alt='*' />
          </div>
        </div>
        <div className='w-full lg:w-3/5 md:pl-6 xl:pl-14 md:pr-12 xl:pr-16 mt-8 md:mt-[10rem] lg:mt-0 md:mb-[5rem] lg:mb-0 flex items-center relative'>
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
