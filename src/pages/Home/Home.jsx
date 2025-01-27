import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { fetchSearchParcel } from '../../api/parcels';
import {
  AboutUs,
  GBServices,
  HowItWorks,
  MainSlider,
  Modal,
  OurGoals,
  Services,
  Testimonials,
} from '../../components';
import { Loading } from '../../helpers/Loader/Loader';
import { scrollToTop } from '../../helpers/ScrollToTop/scrollToTop';
import TempModal from '../../components/Home/TempModal';

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState();
  const [isTempIModal, setIsTempNodal] = useState(
    localStorage.getItem('tempModal')
  );

  const navigate = useNavigate();

  const closeModal = () => {
    setModalOpen(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    const { parcelData } = await fetchSearchParcel(data.orderNumber);
    if (parcelData?.length > 0) {
      setLoading(false);
      navigate(`tracking/${parcelData[0]?.id}`);
    } else {
      setModalOpen(true);
      setModalContent('notFound');
    }
    setLoading(false);
  };

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <>
      {!isTempIModal && <TempModal setIsTempNodal={setIsTempNodal} />}
      <div className='relative slider pt-[58px]'>
        <MainSlider />
        <div className='max-w-[885px] lg:w-full min-h-[190px] shadow-[rgba(204,_204,_204,_0.40)_0px_10px_20px_4px] rounded-md lg:mx-auto mx-4 px-6 md:px-12 py-6 bg-white mt-5 md:-mt-8 relative z-[1]'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h3 className='text-xl font-medium mb-8'>
              Введите ваш номер, чтобы найти вашу посылку
            </h3>
            <div className='md:flex'>
              <div className='md:max-w-[405px] w-full'>
                <input
                  className='w-full px-4 h-[42px] rounded-[10px] shadow-md text-base focus:outline-none'
                  placeholder='Ваш номер'
                  {...register('orderNumber', {
                    required: 'Поле обязательно к заполнению!',
                  })}
                />
                {errors?.orderNumber && (
                  <p className='text-red-500 mt-3 text-sm'>
                    {errors?.orderNumber?.message || 'Error!'}
                  </p>
                )}
              </div>
              <button
                type='submit'
                className='bg-black text-white w-full mt-4 md:mt-0 md:ml-5 h-[42px] font-medium rounded-lg hover:bg-opacity-70 duration-100'
              >
                Отследить
              </button>
            </div>
          </form>
        </div>
      </div>
      {loading && <Loading />}
      <AboutUs />
      <GBServices />
      <Services />
      <OurGoals />
      <HowItWorks />
      <Testimonials />
      <Modal isOpen={modalOpen} onClose={closeModal} content={modalContent} />
    </>
  );
};

export default Home;
