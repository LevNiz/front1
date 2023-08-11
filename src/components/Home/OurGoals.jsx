import vector from './../../assets/images/vector3.png';
import goalsImg from './../../assets/images/goals1.jpg';

const OurGoals = () => {
  return (
    <div className='pt-20 pb-20 lg:pb-40 content'>
      <h1 className='text-3xl sm:text-[40px] font-medium text-center'>
        [ Наши цели ]
      </h1>
      <h4 className='text-xl sm:text-2xl font-medium text-center mt-3 mb-10'>
        Наши цели, миссии, задачи
      </h4>
      <div className='lg:flex pt-8'>
        <div className='lg:w-2/5 relative pl-10 xl2:pl-0'>
          <img
            src={vector}
            className='absolute xl2:top-[-50px] -top-[40px] left-0 xl2:left-[-50px]'
            alt='*'
          />
          <h3 className='text-xl font-bold mb-6'>Наши задачи</h3>
          <p className='text-xl xl:text-2xl font-medium'>
            Lorem ipsum dolor sit amet consectetur. Posuere id amet sit cras
            tellus eget felis magna a. Libero eleifend turpis aliquet pulvinar.
            Elementum vitae dignissim convallis eget iaculis integer nam sit in.
            Orci sed auctor pharetra placerat cras integer vitae.
            <br />
            <br />
            Lorem ipsum dolor sit amet consectetur. Posuere id amet sit cras
            tellus eget felis magna a. Libero eleifend turpis aliquet pulvinar.
          </p>
        </div>
        <div className='mt-10 lg:mt-0 lg:w-3/5 relative'>
          <div className='shadow-[rgba(204,_204,_204,_0.40)_0px_10px_20px_0px] mb-4 lg:mb-12 sm:ml-5 xl:ml-24 p-3 sm:max-w-[268px]'>
            <h4 className='text-xl font-bold text-colPurple'>Наша миссия</h4>
            <p className='text-lg font-medium'>
              Lorem ipsum dolor sit amet consectetur. Posuere id amet sit cras
              tellus eget felis magna a. Libero eleifend turpis aliquet
              pulvinar.{' '}
            </p>
          </div>
          <div className='sm:max-w-[254px] sm:absolute min-h-[200px] sm:min-h-[350px] text-3xl top-0 right-0 p-8 text-white bg-[linear-gradient(180deg,_#9747FF_0%,_rgba(151,_71,_255,_0.00)_100%)]'>
            Lorem ipsum dolor sit
            <br /> amet consectetur.
          </div>
          <div className='max-w-[470px] md:min-w-[470px] max-h-[230px] ml-auto lg:mx-auto -mt-6 sm:pt-4 overflow-hidden'>
            <img
              className='w-full h-full object-cover'
              src={goalsImg}
              alt='*'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurGoals;
