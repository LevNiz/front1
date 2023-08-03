import { MainSlider } from '../../components';
import AboutUs from '../../components/Home/AboutUs';

const Home = () => {
  return (
    <>
      <div className='relative slider'>
        <MainSlider />
        <div className='max-w-[885px] w-full min-h-[190px] shadow-md mx-auto px-12 py-6 bg-white absolute bottom-[-22%] z-[1] left-0 right-0'>
          <form>
            <h3 className='text-xl font-medium mb-8'>
              Введите ваш номер, чтобы найти вашу посылку
            </h3>
            <div className='flex'>
              <input
                className='max-w-[405px] w-full px-4 h-[42px] rounded-[10px] shadow-md text-base'
                type='text'
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
    </>
  );
};

export default Home;
