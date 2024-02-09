import mainBigImg1 from '../../../assets/gb-shop/images/main/mainBigImg1.jpg';
import mainBigImg2 from '../../../assets/gb-shop/images/main/mainBigImg2.png';
import mainImg1 from '../../../assets/gb-shop/images/main/mainImg1.jpg';
import mainImg2 from '../../../assets/gb-shop/images/main/mainImg2.png';
import sale from '../../../assets/gb-shop/images/main/sale.svg';

const MainBlock = () => {
  return (
    <div className='flex md:grid grid-cols-3 gap-2 md:gap-7 pb-10 md:content'>
      <div className='overflow-hidden rounded-tr-md rounded-br-md mm:rounded-md h-[400px] mm:h-[520px] md:h-[680px] w-[35%] mm:w-1/4 md:w-auto'>
        <img
          className='mx-auto w-full h-full object-cover'
          src={mainBigImg1}
          alt='*'
        />
      </div>
      <div className='flex flex-col justify-between items-center text-center w-[30%] mm:w-1/2 md:w-auto'>
        <div className='overflow-hidden rounded-md w-full h-16 mm:h-[132px] bg-gray-100'>
          <img className='w-full h-full object-cover' src={mainImg1} alt='*' />
        </div>
        <div>
          <h1 className='font-ubuntu sm:text-xl mm:text-2xl md:text-4xl xl:text-6xl text-[#484848] font-medium mb-2 md:mb-5 pt-3'>
            Black Friday
          </h1>
          <img className='mx-auto w-4/5 md:w-auto' src={sale} alt='*' />
        </div>
        <div>
          <h4 className='text-[#484848] tracking-[2px] text-[7px] sm:text-[10px] pt-2 md:text-base xl:text-xl uppercase mb-2 md:mb-5'>
            Новая коллекция
          </h4>
          <button className='bg-black text-white text-xs md:text-base p-1 md:p-3 max-w-[200px] w-full font-medium rounded-sm md:rounded-md hover:opacity-80 duration-150'>
            Купить
          </button>
        </div>
        <div className='overflow-hidden rounded-md pt-2 w-full h-16 mm:h-[132px] bg-gray-100'>
          <img
            className='w-full h-full object-contain'
            src={mainImg2}
            alt='*'
          />
        </div>
      </div>
      <div className='overflow-hidden rounded-tl-md rounded-bl-md mm:rounded-md h-[400px] mm:h-[520px] md:h-[680px] w-[35%] mm:w-1/4 md:w-auto bg-gray-100'>
        <img
          className='mx-auto w-full h-full object-contain'
          src={mainBigImg2}
          alt='*'
        />
      </div>
    </div>
  );
};

export default MainBlock;
