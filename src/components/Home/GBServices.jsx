import bgImg from '../../assets/images/services-bg.jpg';
import gbShop from '../../assets/icons/gb-services/gb-shop.svg';
import gbCoin from '../../assets/icons/gb-services/gb-coin.svg';
import gbBusiness from '../../assets/icons/gb-services/gb-business.svg';
import gbFranchise from '../../assets/icons/gb-services/gb-franchise.svg';
import gbBuyer from '../../assets/icons/gb-services/gb-buyer.svg';
import alaket from '../../assets/icons/gb-services/gb-alaket.svg';
import gbChat from '../../assets/icons/gb-services/gb-chat.svg';
import { NavLink } from 'react-router-dom';

const GBServices = () => {
  return (
    <div className='content'>
      <div
        style={{ backgroundImage: `url(${bgImg})` }}
        className='grid grid-cols-2 lg:grid-cols-4 text-white'
      >
        <div className='min-h-[160px] ss:min-h-[180px] sm:min-h-[224px] flex justify-center items-center'>
          <h3 className='font-bold text-2xl sm:text-4xl text-center'>
            Наши <br />
            сервисы
          </h3>
        </div>
        <NavLink
          to='#'
          onClick={() => alert('В процессе разработки!')}
          className='min-h-[160px] ss:min-h-[180px] sm:min-h-[224px] hover:opacity-70 hover:bg-opacity-70 duration-200 flex justify-center items-center bg-orange'
        >
          <div>
            <img className='mx-auto w-12 sm:w-auto' src={gbShop} alt='*' />
            <h3 className='font-medium sm:font-bold text-xl sm:text-2xl lg:text-3xl text-center mt-2'>
              GB-Shop
            </h3>
          </div>
        </NavLink>
        <NavLink
          to='/gb-business'
          className='min-h-[160px] ss:min-h-[180px] sm:min-h-[224px] hover:opacity-70 hover:bg-opacity-70 duration-200 flex justify-center items-center bg-business lg:bg-transparent'
        >
          <div>
            <img className='mx-auto w-12 sm:w-auto' src={gbBusiness} alt='*' />
            <h3 className='font-medium sm:font-bold text-xl sm:text-2xl lg:text-3xl text-center mt-2'>
              GB-Business
            </h3>
          </div>
        </NavLink>
        <NavLink
          to='/gb-franchise'
          className='min-h-[160px] ss:min-h-[180px] sm:min-h-[224px] hover:opacity-70 hover:bg-opacity-70 duration-200 flex justify-center items-center bg-franchise'
        >
          <div>
            <img className='mx-auto w-12 sm:w-auto' src={gbFranchise} alt='*' />
            <h3 className='font-medium sm:font-bold text-xl sm:text-2xl lg:text-3xl text-center mt-2'>
              GB-Franchise
            </h3>
          </div>
        </NavLink>
        <NavLink
          to='#'
          onClick={() => alert('В процессе разработки!')}
          className='min-h-[160px] ss:min-h-[180px] sm:min-h-[224px] hover:opacity-70 hover:bg-opacity-70 duration-200 flex justify-center items-center bg-coin'
        >
          <div>
            <img className='mx-auto w-12 sm:w-auto' src={gbCoin} alt='*' />
            <h3 className='font-medium sm:font-bold text-xl sm:text-2xl lg:text-3xl text-center mt-2'>
              GB-Coin
            </h3>
          </div>
        </NavLink>
        <NavLink
          to='/gb-buyer'
          className='min-h-[160px] ss:min-h-[180px] sm:min-h-[224px] hover:opacity-70 hover:bg-opacity-70 duration-200 flex justify-center items-center bg-buyer lg:bg-transparent'
        >
          <div>
            <img className='mx-auto w-12 sm:w-auto' src={gbBuyer} alt='*' />
            <h3 className='font-medium sm:font-bold text-xl sm:text-2xl lg:text-3xl text-center mt-2'>
              GB-Buyer
            </h3>
          </div>
        </NavLink>
        <NavLink
          to='#'
          onClick={() => alert('В процессе разработки!')}
          className='min-h-[160px] ss:min-h-[180px] sm:min-h-[224px] hover:opacity-70 hover:bg-opacity-70 duration-200 flex justify-center items-center bg-alaket'
        >
          <div>
            <img className='mx-auto w-12 sm:w-auto' src={alaket} alt='*' />
            <h3 className='font-medium sm:font-bold text-xl sm:text-2xl lg:text-3xl text-center mt-2'>
              Alaket
            </h3>
          </div>
        </NavLink>
        <NavLink
          to='/gb-chat'
          className='min-h-[160px] ss:min-h-[180px] sm:min-h-[224px] hover:opacity-70 hover:bg-opacity-70 duration-200 flex justify-center items-center'
        >
          <div>
            <img className='mx-auto w-12 sm:w-auto' src={gbChat} alt='*' />
            <h3 className='font-medium sm:font-bold text-xl sm:text-2xl lg:text-3xl text-center mt-2'>
              GB-Chat
            </h3>
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default GBServices;
