import square from '../../assets/images/gb-business-square.png';
import gbMain from '../../assets/images/gb-business-main.png';
import gbMain2 from '../../assets/images/gb-business-main2.jpg';
import gbBusinessImg1 from '../../assets/images/gbBusImg1.svg';
import gbBusinessImg2 from '../../assets/images/gbBusImg2.svg';
import gbBusinessImg3 from '../../assets/images/gbBusImg3.svg';
import gbBusinessImg4 from '../../assets/images/gbBusImg4.svg';
import gbBusinessBg from '../../assets/images/gb-business-bg.jpg';
import usa from '../../assets/images/usa.svg';
import uae from '../../assets/images/uae.svg';
import skorea from '../../assets/images/skorea.svg';
import europe from '../../assets/images/europe.svg';
import uk from '../../assets/images/uk.svg';
import turkey from '../../assets/images/turkey.svg';
import homeIcon from '../../assets/images/home.svg';

const GBBusinessItem = () => {
  return (
    <div className='pt-5'>
      <div className='content'>
        <div className='md:flex items-center justify-between md:space-x-5 min-h-[520px] pt-12 md:pt-0'>
          <div className='md:w-1/2 text-center relative'>
            <img className='absolute -top-14 left-20' src={square} alt='*' />
            <h2 className='text-3xl mm:text-4xl lg:text-5xl font-bold relative'>
              “Опять мой груз потрепанный доехал”{' '}
            </h2>
            <p className='mm:text-xl py-6 max-w-[446px] mx-auto relative'>
              именно так говорят 99% бизнесменов, которые не знакомы с
              платформой
            </p>
            <h2 className='relative text-4xl lg:text-5xl font-bold w-max mx-auto'>
              <span className='absolute -top-2.5 -left-12 w-[220px] h-[62px] lg:h-[72px] bg-colYellow'></span>
              <span className='relative'>GB Business</span>
            </h2>
          </div>
          <div className='md:w-1/2'>
            <img src={gbMain} alt='*' />
          </div>
        </div>
        <div className='flex items-center justify-between flex-col md:flex-row md:space-x-5 min-h-[520px]'>
          <div className='md:w-1/2 order-1 md:order-0'>
            <img src={gbMain2} alt='*' />
          </div>
          <div className='md:w-1/2 text-center'>
            <h2 className='text-xl mm:text-3xl xl:text-[40px] xl:leading-[48px] font-medium'>
              А вот что испытывают те, кто работают с нами!
            </h2>
            <h2 className='text-xl mm:text-3xl xl:text-[40px] xl:leading-[48px] font-bold pt-10 max-w-[480px] mx-auto'>
              “Мой груз был доставлен по высшим стандартам и я даже не парился
              об этом”
            </h2>
          </div>
        </div>
        <h2 className='text-2xl lg:text-4xl text-center font-bold'>Ведь</h2>
        <h2 className='relative text-2xl lg:text-4xl font-medium my-8'>
          <span className='absolute -top-1 mm:-top-1.5 xl:-top-2 -left-8 w-[130px] h-10 mm:h-[50px] xl:h-[56px] bg-colYellow'></span>
          <span className='relative'>
            GivBox предлагает беспроблемную перевозку грузов с помощью:
          </span>
        </h2>
        <div className='md:flex items-start md:justify-center pt-5'>
          <div className='flex md:justify-around items-center w-full rounded-[20px] md:w-max px-8 py-3 shadow-[0px_10px_20px_0px_rgba(204,_204,_204,_0.40)]'>
            <img src={gbBusinessImg1} alt='*' />
            <div className='pl-10'>
              <h4 className='font-medium text-xl'>Морских контейнеров </h4>
              <p className='font-medium text-sm'>
                (габаритные и негабаритные грузы)
              </p>
            </div>
          </div>
          <div className='flex md:justify-around items-center w-full md:ml-8 lg:ml-20 mt-10 rounded-[20px] md:w-max px-8 py-3 text-white shadow-[0px_10px_20px_0px_rgba(204,_204,_204,_0.40)] bg-[linear-gradient(180deg,_#9DF2FF_-52.61%,_#0AB5EB_100%)]'>
            <img src={gbBusinessImg2} alt='*' />
            <h4 className='font-medium text-xl pl-10'>Автотранспорта</h4>
          </div>
        </div>
        <div className='md:flex items-start md:justify-center pb-20'>
          <div className='flex md:justify-around items-center w-full mt-10 md:mt-0 rounded-[20px] md:w-max px-8 py-3 shadow-[0px_10px_20px_0px_rgba(204,_204,_204,_0.40)]'>
            <img src={gbBusinessImg3} alt='*' />
            <h4 className='font-medium text-xl pl-10'>Железных дорог</h4>
          </div>
          <div className='flex md:justify-around items-center w-full md:ml-10 mt-10 rounded-[20px] md:w-max px-8 py-3 shadow-[0px_10px_20px_0px_rgba(204,_204,_204,_0.40)]'>
            <img src={gbBusinessImg4} alt='*' />
            <h4 className='font-medium text-xl pl-10'>Морских контейнеров </h4>
          </div>
        </div>
      </div>
      <div
        style={{ backgroundImage: `url(${gbBusinessBg})` }}
        className='md:min-h-[528px] bg-no-repeat bg-center bg-cover py-10'
      >
        <div className='content'>
          <h3 className='text-2xl md:text-3xl lg:text-4xl font-bold text-center'>
            Вы хоть понимаете масштаб нашей компании ?
          </h3>
          <h4 className='text-lg md:text-2xl lg:text-3xl font-medium text-center pt-2 md:pt-6 pb-6 md:pb-0'>
            У нас имеются свои компании и склады в{' '}
          </h4>
        </div>
        <div className='px-4 md:px-0 md:relative grid md:block grid-cols-2 gap-5'>
          <div className='md:absolute top-5 gg:top-0 left-20 flex items-center space-x-3'>
            <img className='w-8 mm:w-12 md:w-[70px]' src={homeIcon} alt='*' />
            <img className='w-5 md:w-8' src={usa} alt='*' />
            <span className='md:text-2xl font-medium'>США</span>
          </div>
          <div className='md:absolute top-8 gg:-top-5 right-20  flex items-center space-x-3'>
            <img className='w-8 mm:w-12 md:w-[70px]' src={homeIcon} alt='*' />
            <img className='w-5 md:w-8' src={uae} alt='*' />
            <span className='md:text-2xl font-medium'>ОАЭ</span>
          </div>
          <div className='md:absolute right-20 top-40 gg:top-48 flex items-center space-x-3'>
            <img className='w-8 mm:w-12 md:w-[70px]' src={homeIcon} alt='*' />
            <img className='w-5 md:w-8' src={uk} alt='*' />
            <span className='md:text-2xl font-medium line-clamp-1 break-all'>
              Великобритании
            </span>
          </div>
          <div className='md:absolute top-20 left-[30%] flex items-center space-x-3'>
            <img className='w-8 mm:w-12 md:w-[70px]' src={homeIcon} alt='*' />
            <img className='w-5 md:w-8' src={skorea} alt='*' />
            <span className='md:text-2xl font-medium'>Корее</span>
          </div>
          <div className='md:absolute top-40 left-[5%] gg:left-[20%] flex items-center space-x-3'>
            <img className='w-8 mm:w-12 md:w-[70px]' src={homeIcon} alt='*' />
            <img className='w-5 md:w-8' src={turkey} alt='*' />
            <span className='md:text-2xl font-medium'>Турции</span>
          </div>
          <div className='md:absolute top-60 gg:top-48 left-[30%] gg:left-[40%] flex items-center space-x-3'>
            <img className='w-8 mm:w-12 md:w-[70px]' src={homeIcon} alt='*' />
            <img className='w-5 md:w-8' src={europe} alt='*' />
            <span className='md:text-2xl font-medium'>Европе</span>
          </div>
        </div>
      </div>
      <div className='relative'>
        <div className='xl:block hidden absolute top-0 left-0 bg-[#020105] w-full lg:w-[90%] h-[200px] ld:h-[240px] lg:h-[180px] rounded-br-[120px] xl:rounded-br-[200px]'></div>
        <div className='xl:content relative'>
          <h2 className='bg-black xl:bg-transparent rounded-br-[80px] text-2xl lg:text-4xl px-4 xl:px-0 lg:leading-[48px] text-white font-medium py-5 lg:py-10 md:max-w-[90%] xl:max-w-[80%]'>
            А еще для вашего удобства мы осуществляем платежи по инвойсам и
            контрактам в абсолютно любых валютах.
          </h2>
        </div>
      </div>
    </div>
  );
};

export default GBBusinessItem;
