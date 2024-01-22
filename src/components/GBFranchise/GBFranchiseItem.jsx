import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postFranchise } from '../../api/gbFranchise';
import { Loading } from '../../helpers/Loader/Loader';
import { useForm } from 'react-hook-form';
import Modal from '../../helpers/Modals/Modal';
import GBFranchiseForm from './GBFranchiseForm';
import questionYellow from '../../assets/icons/question-yellow.svg';
import questionWhite from '../../assets/icons/question-white.svg';
import bgImg from '../../assets/images/franchise-bg.jpg';
import bgImg2 from '../../assets/images/business-bg.jpg';
import gbFranchiseArrow from '../../assets/icons/gbFranchiseArrow.svg';

const GBFranchiseItem = () => {
  const { user } = useSelector((state) => state?.user);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { reset } = useForm();

  const closeModal = () => {
    setModalOpen(false);
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    if (user) {
      const { success } = await postFranchise(data);
      if (success) {
        setModalOpen(true);
        setModalContent('successRequest');
        setIsLoading(false);
        reset();
      } else {
        setModalOpen(true);
        setModalContent('errorRequest');
        setIsLoading(false);
      }
    } else {
      navigate('/auth/sign-in');
    }
  };

  return (
    <div className='pb-40'>
      <div
        style={{ backgroundImage: `url(${bgImg})` }}
        className='min-h-[480px] md:min-h-[598px] bg-cover bg-no-repeat bg-center flex items-center relative'
      >
        <div className='content'>
          <h3 className='text-[#020105] text-2xl mm:text-4xl font-medium max-w-[860px]'>
            Что если мы скажем что вы можете зарабатывать и развиваться вместе с
            нами?
          </h3>
          <h5 className='mm:text-xl font-medium pt-10 mm:pb-2'>
            ЭТО БЫЛО БЫ СКАЗКОЙ, ЕСЛИ БЫ НЕ{' '}
          </h5>
          <h1 className='text-[70px] font-bold relative z-10'>GivBox</h1>
        </div>
      </div>
      <div className='relative'>
        <div className='md:block hidden absolute top-0 left-0 bg-[#020105] w-full lg:w-[90%] h-[200px] ld:h-[240px] lg:h-[265px] rounded-br-[80px] ld:rounded-br-[200px]'></div>
        <div className='md:content relative'>
          <h2 className='bg-black md:bg-transparent rounded-br-[80px] text-2xl md:text-[40px] lg:text-[46px] gg:text-[55px] px-4 md:px-0 md:leading-[54px] lg:leading-[65px] text-white font-bold py-7 md:py-10 md:max-w-[90%] xl:max-w-[80%]'>
            Начните зарабатывать на доставке и продаже брендовых товаров по
            всему миру!
          </h2>
        </div>
      </div>
      <div className='content pt-10'>
        <h3 className='text-2xl mm:text-4xl font-medium text-center py-2'>
          Ведь, кто еще может предоставить вам:{' '}
        </h3>
        <div className='dd:flex items-start justify-center space-y-8 dd:space-y-0 dd:space-x-10 flex-wrap relative pt-10'>
          <div className='flex flex-start py-4 px-6 shadow-[0px_10px_20px_0px_#CCC] rounded-[20px] dd:w-max dd:mt-16'>
            <img
              className='w-8 h-8 min-w-[32px] mr-3'
              src={questionYellow}
              alt='*'
            />
            <span className='text-xl font-medium dd:max-w-[290px]'>
              Лучшую поддержку в сфере IT и маркетинга?
            </span>
          </div>
          <div className='flex flex-start py-4 px-6 shadow-[0px_10px_20px_0px_#CCC] rounded-[20px] dd:w-max'>
            <img
              className='w-8 h-8 min-w-[32px] mr-3'
              src={questionYellow}
              alt='*'
            />
            <span className='text-xl font-medium dd:max-w-[290px]'>
              Прибыль с начала сотрудничества?
            </span>
          </div>
          <div className='flex flex-start py-4 px-6 !mt-14 shadow-[0px_10px_20px_0px_#CCC] rounded-[20px] dd:w-max bg-[linear-gradient(1deg,_#D660F2_0.83%,_#F897C7_98.99%)]'>
            <img
              className='w-8 h-8 min-w-[32px] mr-3'
              src={questionWhite}
              alt='*'
            />
            <span className='text-xl font-medium dd:max-w-[290px] text-white'>
              Бесплатный бизнес-план?
            </span>
          </div>
          <div className='flex flex-start py-4 px-6 shadow-[0px_10px_20px_0px_#CCC] rounded-[20px] dd:w-max dd:!mt-16'>
            <img
              className='w-8 h-8 min-w-[32px] mr-3'
              src={questionYellow}
              alt='*'
            />
            <span className='text-xl font-medium dd:max-w-[290px]'>
              Открытие личного магазина в GB-Shop?
            </span>
          </div>
          <div className='flex flex-start py-4 px-6 shadow-[0px_10px_20px_0px_#CCC] rounded-[20px] dd:w-max dd:!mt-5'>
            <img
              className='w-8 h-8 min-w-[32px] mr-3'
              src={questionYellow}
              alt='*'
            />
            <span className='text-xl font-medium dd:max-w-[290px]'>
              Прибыльные маршруты и тарифы по доставке?
            </span>
          </div>
        </div>
        <h4 className='text-center text-2xl mm:text-3xl font-medium pt-14 pb-7'>
          Ответ таков
        </h4>
        <div className='flex items-start justify-center mx-auto pb-8 mm:pb-24'>
          <img className='w-8 mm:w-14' src={gbFranchiseArrow} alt='*' />
          <h2 className='text-4xl mm:text-6xl font-bold pl-3'>GB-Franchise</h2>
        </div>
        <div className='text-center relative z-10 rounded-[30px] p-5 mm:p-8 mx-auto w-full max-w-[856px] border-t-2 border-l-2 border-[#D660F2] shadow-[0px_10px_20px_0px_rgba(204,_204,_204,_0.40)]'>
          <h3 className='text-2xl sx:text-3xl lg:text-[52px] font-bold pb-3'>
            Ну так чего вы ждете?{' '}
          </h3>
          <p className='sx:text-xl lg:text-3xl font-medium'>
            За вас уже все сделано, вам только осталось собирать{' '}
            <br className='mm:block hidden' />
            <span className='font-bold'>ДЕНЬГИ</span>
          </p>
        </div>
      </div>
      <div
        style={{ backgroundImage: `url(${bgImg2})` }}
        className='min-h-[740px] mm:min-h-[991px] lg:min-h-[1200px] bg-cover bg-center -mt-28 relative'
      >
        <div className='absolute w-full -bottom-[68px] left-1/2 -translate-x-1/2'>
          <h2 className='text-3xl text-white font-medium bg-black rounded-2xl px-5 py-3 w-max mx-auto mb-10'>
            Хочу бизнес план
          </h2>
          <GBFranchiseForm onSubmit={onSubmit} />
        </div>
      </div>
      <Modal isOpen={modalOpen} onClose={closeModal} content={modalContent} />
      {isLoading ? <Loading /> : ''}
    </div>
  );
};

export default GBFranchiseItem;
