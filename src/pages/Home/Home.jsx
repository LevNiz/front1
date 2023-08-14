import {
  AboutUs,
  HowItWorks,
  MainSlider,
  OurGoals,
  Services,
  Testimonials,
} from '../../components';

const Home = () => {
  return (
    <>
      <div className='relative slider'>
        <MainSlider />
        <div className='max-w-[885px] lg:w-full min-h-[190px] shadow-[rgba(204,_204,_204,_0.40)_0px_10px_20px_0px] rounded-md lg:mx-auto mx-4 px-6 md:px-12 py-6 bg-white mt-10 lg:mt-0 lg:absolute bottom-[-22%] z-[1] left-0 right-0'>
          <form>
            <h3 className='text-xl font-medium mb-8'>
              Введите ваш номер, чтобы найти вашу посылку
            </h3>
            <div className='md:flex'>
              <input
                className='md:max-w-[405px] w-full px-4 h-[42px] rounded-[10px] shadow-md text-base focus:outline-none'
                type='text'
                placeholder='Ваш номер'
              />
              <button className='bg-colYellow w-full mt-4 md:mt-0 md:ml-5 h-[42px] font-medium rounded-lg hover:bg-colYellowHover duration-100'>
                Отследить
              </button>
            </div>
          </form>
        </div>
      </div>
      <AboutUs />
      <Services />
      <OurGoals />
      <HowItWorks />
      <Testimonials />
    </>
  );
};

export default Home;
