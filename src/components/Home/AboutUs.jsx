import aboutUsImg1 from './../../assets/images/aboutUsImg1.jpg';
import aboutUsImg2 from './../../assets/images/aboutUsImg2.jpg';
import aboutUsImg3 from './../../assets/images/aboutUsImg3.png';
import vector from './../../assets/images/vector2.png';

const AboutUs = () => {
  return (
    <div className='min-h-[850px] pt-[200px] pb-32 container'>
      <h1 className='text-[40px] font-medium text-center'>[ О нас ]</h1>
      <h4 className='text-2xl font-medium text-center mt-3'>
        Мы всегда к вашим услугам
      </h4>
      <div className='flex relative min-h-[520px] mt-12'>
        <div className='w-2/5 relative'>
          <div className='max-w-[275px] min-w-[275px] w-[275px] max-height-[308px] min-height-[308px] absolute top-0 z-30 right-[40px] overflow-hidden'>
            <img
              className='w-full h-full object-cover'
              src={aboutUsImg1}
              alt='*'
            />
          </div>
          <div className='max-w-[275px] min-w-[275px] w-[275px] max-height-[308px] min-height-[308px] absolute bottom-0 left-0 z-20 overflow-hidden'>
            <img
              className='w-full h-full object-cover'
              src={aboutUsImg2}
              alt='*'
            />
          </div>
          <div className='w-[190px] h-[171px] bg-black flex justify-center items-center absolute bottom-0 right-[25px] overflow-hidden'>
            <img
              src={aboutUsImg3}
              alt='*'
            />
          </div>
        </div>
        <div className='w-3/5 pl-14 pr-16 flex items-center relative'>
            <img src={vector} className='absolute top-1/2 right-0 transform -translate-y-1/2 -z-[1]' alt="*" />
          <p className='text-2xl font-medium'>
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
