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
        <div className='max-w-[885px] w-full min-h-[190px] shadow-[rgba(204,_204,_204,_0.40)_0px_10px_20px_0px] rounded-md mx-auto px-12 py-6 bg-white absolute bottom-[-22%] z-[1] left-0 right-0'>
          <form>
            <h3 className='text-xl font-medium mb-8'>
              Введите ваш номер, чтобы найти вашу посылку
            </h3>
            <div className='flex'>
              <input
                className='max-w-[405px] w-full px-4 h-[42px] rounded-[10px] shadow-md text-base focus:outline-none'
                type='number'
                placeholder='Ваш номер'
              />
              <button className='bg-colYellow w-full ml-5 h-[42px] font-medium rounded-lg hover:bg-colYellowHover duration-100'>
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
