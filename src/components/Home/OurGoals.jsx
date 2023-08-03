import vector from './../../assets/images/vector3.png';
import goalsImg from './../../assets/images/goals1.jpg';

const OurGoals = () => {
  return (
    <div className='pt-20 pb-40 content'>
      <h1 className='text-[40px] font-medium text-center'>[ Наши цели ]</h1>
      <h4 className='text-2xl font-medium text-center mt-3'>
        Наши цели, миссии, задачи
      </h4>
      <div className='flex pt-8'>
        <div className='w-2/5 relative'>
          <img
            src={vector}
            className='absolute top-[-50px] left-[-50px]'
            alt='*'
          />
          <h3 className='text-xl font-bold mb-6'>Наши задачи</h3>
          <p className='text-2xl font-medium'>
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
        <div className='w-3/5 relative'>
          <div className='shadow-[rgba(204,_204,_204,_0.40)_0px_10px_20px_0px] mb-12 ml-24 p-3 max-w-[268px]'>
            <h4 className='text-xl font-bold text-colPurple'>Наша миссия</h4>
            <p className='text-lg font-medium'>
              Lorem ipsum dolor sit amet consectetur. Posuere id amet sit cras
              tellus eget felis magna a. Libero eleifend turpis aliquet
              pulvinar.{' '}
            </p>
          </div>
          <div className='max-w-[254px] absolute min-h-[350px] text-3xl top-0 right-0 p-8 text-white bg-[linear-gradient(180deg,_#9747FF_0%,_rgba(151,_71,_255,_0.00)_100%)]'>
          Lorem ipsum dolor sit<br/> amet consectetur. 
          </div>
          <div className='max-w-[470px] min-w-[470px] max-h-[230px] mx-auto pt-4 overflow-hidden'>
            <img className='w-full h-full object-cover' src={goalsImg} alt='*' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurGoals;
