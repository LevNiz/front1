import bgImg from '../../assets/images/services-bg.jpg';
import gbShop from '../../assets/icons/gb-services/gb-shop.svg';
// import gbPay from '../../assets/icons/gb-services/gb-pay.svg';
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
        <div className='min-h-[180px] ss:min-h-[220px] flex justify-center items-center'>
          <h3 className='font-bold text-2xl sm:text-4xl text-center'>
            Наши <br />
            сервисы
          </h3>
        </div>
        <NavLink
          to='/gb-shop'
          target='_blank'
          className='relative group min-h-[180px] ss:min-h-[220px] py-2 flex justify-center items-center bg-orange'
        >
          <div>
            <img className='mx-auto w-10 sm:w-auto' src={gbShop} alt='*' />
            <h3 className='font-medium sm:font-bold text-lg mm:text-2xl lg:text-3xl text-center mt-2'>
              GB-Shop
            </h3>
            <p className='lg:hidden text-center p-2 text-[#FBFBFB] opacity-80 text-[10px] sm:text-sm'>
              Самый короткий путь к стилю и качеству. С нами брендовые товары
              еще проще и доступнее
            </p>
          </div>
          <div className='hidden lg:flex group-hover:opacity-[1] opacity-0 duration-200 absolute top-0 left-0 w-full h-full justify-center items-center bg-[linear-gradient(180deg,_rgba(2,_1,_5,_0.58)_0%,_#020105_100%)]'>
            <p className='text-center p-3 text-[#FBFBFB]'>
              Самый короткий путь к стилю и качеству. С нами брендовые товары
              еще проще и доступнее
            </p>
          </div>
        </NavLink>
        <NavLink
          to='/gb-business'
          className='relative group min-h-[180px] ss:min-h-[220px] py-2 flex justify-center items-center bg-business lg:bg-transparent'
        >
          <div>
            <img className='mx-auto w-10 sm:w-auto' src={gbBusiness} alt='*' />
            <h3 className='font-medium sm:font-bold text-lg mm:text-2xl lg:text-3xl text-center mt-2'>
              GB-Business
            </h3>
            <p className='lg:hidden text-center p-2 text-[#FBFBFB] opacity-80 text-[10px] sm:text-sm'>
              Доставка в любую точку мира без лишних хлопот. Быстро, надежно и
              выгодно. Управляйте своими коммерческими грузами на глобальном
              уровне
            </p>
          </div>
          <div className='hidden lg:flex group-hover:opacity-[1] opacity-0 duration-200 absolute top-0 left-0 w-full h-full justify-center items-center bg-[linear-gradient(180deg,_rgba(2,_1,_5,_0.58)_0%,_#020105_100%)]'>
            <p className='text-center p-3 text-[#FBFBFB]'>
              Доставка в любую точку мира без лишних хлопот. Быстро, надежно и
              выгодно. Управляйте своими коммерческими грузами на глобальном
              уровне
            </p>
          </div>
        </NavLink>
        <NavLink
          to='/gb-franchise'
          className='relative group min-h-[180px] ss:min-h-[220px] py-2 flex justify-center items-center bg-franchise'
        >
          <div>
            <img className='mx-auto w-10 sm:w-auto' src={gbFranchise} alt='*' />
            <h3 className='font-medium sm:font-bold text-lg mm:text-2xl lg:text-3xl text-center mt-2'>
              GB-Franchise
            </h3>
            <p className='lg:hidden text-center p-2 text-[#FBFBFB] opacity-80 text-[10px] sm:text-sm'>
              Мгновенный успех в открытии складов ожидает ваш первый шаг.
              Получите узнаваемое имя и готовый бизнес план в мгновении.
            </p>
          </div>
          <div className='hidden lg:flex group-hover:opacity-[1] opacity-0 duration-200 absolute top-0 left-0 w-full h-full justify-center items-center bg-[linear-gradient(180deg,_rgba(2,_1,_5,_0.58)_0%,_#020105_100%)]'>
            <p className='text-center p-3 text-[#FBFBFB]'>
              Мгновенный успех в открытии складов ожидает ваш первый шаг.
              Получите узнаваемое имя и готовый бизнес план в мгновении.
            </p>
          </div>
        </NavLink>
        <NavLink
          to='/gb-chat'
          className='relative group min-h-[180px] ss:min-h-[220px] py-2 flex justify-center items-center bg-gbChat'
        >
          <div>
            <img className='mx-auto w-10 sm:w-auto' src={gbChat} alt='*' />
            <h3 className='font-medium sm:font-bold text-lg mm:text-2xl lg:text-3xl text-center mt-2'>
              GB-Chat
            </h3>
            <p className='lg:hidden text-center p-2 text-[#FBFBFB] opacity-80 text-[10px] sm:text-sm'>
              Не оставит вас одного с кучей важных вопросов. Простой и
              практичный чат созданный для всех наших клиентов и в частности
              именно Вас
            </p>
          </div>
          <div className='hidden lg:flex group-hover:opacity-[1] opacity-0 duration-200 absolute top-0 left-0 w-full h-full justify-center items-center bg-[linear-gradient(180deg,_rgba(2,_1,_5,_0.58)_0%,_#020105_100%)]'>
            <p className='text-center p-3 text-[#FBFBFB]'>
              Не оставит вас одного с кучей важных вопросов. Простой и
              практичный чат созданный для всех наших клиентов и в частности
              именно Вас
            </p>
          </div>
        </NavLink>
        {/* <NavLink
          to='#'
          onClick={() => alert('В процессе разработки!')}
          className='relative group min-h-[180px] ss:min-h-[220px] py-2 flex justify-center items-center bg-pay'
        >
          <div>
            <img className='mx-auto w-10 sm:w-auto' src={gbPay} alt='*' />
            <h3 className='font-medium sm:font-bold text-lg mm:text-2xl lg:text-3xl text-center mt-2'>
              GB-Pay
            </h3>
            <p className='lg:hidden text-center p-2 text-[#FBFBFB] opacity-80 text-[10px] sm:text-sm'>
              Удобная платежная система от GivBox. Оплачивайте услуги компании
              моментально и самое главное безопасно
            </p>
          </div>
          <div className='hidden lg:flex group-hover:opacity-[1] opacity-0 duration-200 absolute top-0 left-0 w-full h-full justify-center items-center bg-[linear-gradient(180deg,_rgba(2,_1,_5,_0.58)_0%,_#020105_100%)]'>
            <p className='text-center p-3 text-[#FBFBFB]'>
              Удобная платежная система от GivBox. Оплачивайте услуги компании
              моментально и самое главное безопасно
            </p>
          </div>
        </NavLink> */}
        <NavLink
          to='/gb-buyer'
          className='relative group min-h-[180px] ss:min-h-[220px] py-2 flex justify-center items-center bg-buyer lg:bg-transparent'
        >
          <div>
            <img className='mx-auto w-10 sm:w-auto' src={gbBuyer} alt='*' />
            <h3 className='font-medium sm:font-bold text-lg mm:text-2xl lg:text-3xl text-center mt-2'>
              GB-Buyer
            </h3>
            <p className='lg:hidden text-center p-2 text-[#FBFBFB] opacity-80 text-[10px] sm:text-sm'>
              Ваш путь к успешному продвижению и заказу байерских услуг! Мы
              гарантируем комфортные, а самое главное безопасные условия для
              поиска идеальных клиентов и исполнителей.
            </p>
          </div>
          <div className='hidden lg:flex group-hover:opacity-[1] opacity-0 duration-200 absolute top-0 left-0 w-full h-full justify-center items-center bg-[linear-gradient(180deg,_rgba(2,_1,_5,_0.58)_0%,_#020105_100%)]'>
            <p className='text-center p-3 text-[#FBFBFB]'>
              Ваш путь к успешному продвижению и заказу байерских услуг! Мы
              гарантируем комфортные, а самое главное безопасные условия для
              поиска идеальных клиентов и исполнителей.
            </p>
          </div>
        </NavLink>
        <NavLink
          to='/alaket'
          className='relative group min-h-[180px] ss:min-h-[220px] py-2 flex justify-center items-center bg-alaket'
        >
          <div>
            <img className='mx-auto w-10 sm:w-auto' src={alaket} alt='*' />
            <h3 className='font-medium sm:font-bold text-lg mm:text-2xl lg:text-3xl text-center mt-2'>
              GB-Alaket
            </h3>
            <p className='lg:hidden text-center p-2 text-[#FBFBFB] opacity-80 text-[10px] sm:text-sm'>
              Моментально найдет человека для передачи ваших посылок, или же
              предложит вам взять на себя эту увлекательную и оплачиваемую
              миссию
            </p>
          </div>
          <div className='hidden lg:flex group-hover:opacity-[1] opacity-0 duration-200 absolute top-0 left-0 w-full h-full justify-center items-center bg-[linear-gradient(180deg,_rgba(2,_1,_5,_0.58)_0%,_#020105_100%)]'>
            <p className='text-center p-3 text-[#FBFBFB]'>
              Моментально найдет человека для передачи ваших посылок, или же
              предложит вам взять на себя эту увлекательную и оплачиваемую
              миссию
            </p>
          </div>
        </NavLink>
        {/* <NavLink
          to='/gb-chat'
          className='relative group min-h-[180px] ss:min-h-[220px] py-2 flex justify-center items-center'
        >
          <div>
            <img className='mx-auto w-10 sm:w-auto' src={gbChat} alt='*' />
            <h3 className='font-medium sm:font-bold text-lg mm:text-2xl lg:text-3xl text-center mt-2'>
              GB-Chat
            </h3>
            <p className='lg:hidden text-center p-2 text-[#FBFBFB] opacity-80 text-[10px] sm:text-sm'>
              Не оставит вас одного с кучей важных вопросов. Простой и
              практичный чат созданный для всех наших клиентов и в частности
              именно Вас
            </p>
          </div>
          <div className='hidden lg:flex group-hover:opacity-[1] opacity-0 duration-200 absolute top-0 left-0 w-full h-full justify-center items-center bg-[linear-gradient(180deg,_rgba(2,_1,_5,_0.58)_0%,_#020105_100%)]'>
            <p className='text-center p-3 text-[#FBFBFB]'>
              Не оставит вас одного с кучей важных вопросов. Простой и
              практичный чат созданный для всех наших клиентов и в частности
              именно Вас
            </p>
          </div>
        </NavLink> */}
      </div>
    </div>
  );
};

export default GBServices;
