import aboutUsImg1 from './../../assets/images/aboutUsImg1.jpg';
import aboutUsImg2 from './../../assets/images/aboutUsImg2.jpg';
import aboutUsImg3 from './../../assets/images/aboutUsImg3.png';
import vector from './../../assets/images/vector2.png';

const AboutUs = () => {
  return (
    <div className='min-h-[850px] pt-14 lg:pt-[200px] pb-14 md:pb-32'>
      <h1 className='text-[40px] font-medium text-center'>[ О нас ]</h1>
      <h4 className='text-2xl font-medium text-center mt-3'>
        Мы всегда к вашим услугам
      </h4>
      <div className='lg:flex sm:min-h-[520px] mt-12'>
        <div className='w-full lg:w-2/5 min-h-[440px] sm:min-h-[520px] relative'>
          <div className='max-w-[200px] sm:max-w-[275px] sm:min-w-[275px] w-[275px] max-height-[308px] min-height-[308px] absolute top-0 z-30 right-[16px] md:right-[40px] overflow-hidden'>
            <img
              className='w-full h-full object-cover'
              src={aboutUsImg1}
              alt='*'
            />
          </div>
          <div className='max-w-[200px] sm:max-w-[275px] sm:min-w-[275px] w-[275px] max-height-[308px] min-height-[308px] absolute bottom-[60px] sm:bottom-0 left-[16px] sm:left-auto sm:right-[240px] lg:right-auto lg:left-0 z-20 overflow-hidden'>
            <img
              className='w-full h-full object-cover'
              src={aboutUsImg2}
              alt='*'
            />
          </div>
          <div className='w-[190px] h-[171px] bg-black flex justify-center items-center absolute bottom-[30px] sm:bottom-0 right-[36px] sm:right-0 overflow-hidden'>
            <img src={aboutUsImg3} alt='*' />
          </div>
        </div>
        <div className='w-full lg:w-3/5 pl-4 md:pl-6 xl:pl-14 pr-4 md:pr-12 xl:pr-16 mt-8 md:mt-[10rem] lg:mt-0 md:mb-[5rem] lg:mb-0 flex items-center relative'>
          <img
            src={vector}
            className='absolute hidden md:block top-1/2 right-[10px] xl:-right-[20px] transform -translate-y-1/2 -z-[1]'
            alt='*'
          />
          <p className='text-xl xl:text-2xl font-medium'>
            Lorem ipsum dolor sit amet consectetur. Posuere id amet sit cras
            tellus eget felis magna a. Libero eleifend turpis aliquet pulvinar.
            Elementum vitae dignissim convallis eget iaculis integer nam sit in.
            Orci sed auctor pharetra placerat cras integer vitae.
            <br />
            <br />
            Lorem ipsum dolor sit amet consectetur. Posuere id amet sit cras
            tellus eget felis magna a. Libero eleifend turpis aliquet pulvinar.
            Elementum vitae dignissim convallis eget iaculis integer nam sit in.
            Orci sed auctor pharetra placerat cras integer vitae.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
