import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchCosts } from '../../../api/costs';
import { useForm } from 'react-hook-form';
import editIcon from '../../../assets/icons/edit.svg';
import attention from '../../../assets/icons/attention2.svg';
import attention2 from '../../../assets/icons/attention.svg';
import { postApplications } from '../../../api/applications';
import { Loading } from '../../../helpers/Loader/Loader';
import Modal from '../../../helpers/Modals/Modal';
import SApplicationForm from './SApplicationForm';
import SApplicationDetail from './SApplicationDetail';
import SApplicationReceiver from './SApplicationReceiver';
import SApplicationComment from './SApplicationComment';

const SApplicationItem = () => {
  const { state } = useLocation();
  const { userID } = useSelector((state) => state?.user);
  const { costs } = useSelector((state) => state?.costs);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm();

  const [parcelCost, setParcelCost] = useState(state?.parcelCost);
  const [params, setParams] = useState(state);
  const [isDisabled, setIsDisabled] = useState(
    state === null || state?.orderData?.depotTariff ? true : false
  );
  const [tariff, setTariff] = useState(state?.tariff);
  const [isLoading, setIsLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [receiver, setReceiver] = useState('');

  const dateArrival = watch('dateArrival');
  const comment = watch('comment');

  const isButtonDisabled = !(dateArrival && comment && receiver);

  useEffect(() => {
    (async () => {
       await fetchCosts(dispatch);
    })();
  }, []);

  const closeModal = () => {
    setModalOpen(false);
  };

  const onHandleTariff = (data) => {
    setTariff(data);
  };

  const handleReceiverData = (data) => {
    setReceiver(data);
  };

  const onSubmitCalc = (data) => {
    const orderData = {};
    Object.assign(orderData, data);
    const parcelWeight = (data.width * data.length * data.height) / 5000;
    const scopeWeight =
      data.parcelSize.value === 'custom'
        ? parcelWeight > data.weight
          ? parcelWeight
          : Number(data.weight)
        : Number(data.parcelSize.weight);
    setParams({ ...orderData, scopeWeight });
    setIsDisabled(false);
    const cityParcelCost = costs?.find(
      (cost) =>
        cost?.fromCity?.id === data?.senderCity?.value &&
        cost?.toCity?.id === data?.receiverCity?.value
    );
    if (cityParcelCost) {
      const costPerKg = cityParcelCost.costPerKg;
      let parCost;
      if (data.parcelSize.value === 'custom') {
        const { width, length, height } = data;
        const parcelWeight = (width * length * height) / 5000;
        parCost = Math.max(parcelWeight, data.weight) * costPerKg;
      } else {
        parCost = data.parcelSize.weight * costPerKg;
      }
      setParcelCost(parCost?.toFixed(2));
    } else {
      alert('Цена доставки не указана! (из города / в город)');
    }
  };

  const onSubmitForm = async (data) => {
    setIsLoading(true);
    const requestData = { ...params, ...data, ...receiver };
    requestData.cost = tariff === 2 ? Number(parcelCost) + 4 : parcelCost;
    const { success } = await postApplications(requestData, userID);
    if (success) {
      setIsLoading(false);
      setModalOpen(true);
      setModalContent('successRequest');
      navigate('/applications');
    } else {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div>
        <div className='lg:shadow-[0_8px_34px_#00000026] lg:p-7 rounded-xl'>
          <div className='flex items-center pb-5'>
            <span className='bg-black text-colYellow rounded-full min-w-[32px] h-8 flex justify-center items-center font-medium text-lg'>
              1
            </span>
            <h3 className='text-xl text-[#6747e5] font-medium ml-2'>
              Основные параметры
            </h3>
            <span
              onClick={() => setIsDisabled(true)}
              className='w-7 h-7 ml-3 flex justify-center items-center rounded-md border border-gray-500 opacity-70 cursor-pointer'
            >
              <img className='w-5' src={editIcon} alt='*' />
            </span>
          </div>
          <div
            className={`${!isDisabled ? 'pointer-events-none opacity-40' : ''}`}
          >
            <SApplicationForm
              state={state}
              onSubmit={onSubmitCalc}
              onHandleTariff={onHandleTariff}
              cost={parcelCost}
            />
          </div>
          <div
            className={`${isDisabled ? 'pointer-events-none opacity-40' : ''}`}
          >
            <div className='flex items-center pb-5 pt-8'>
              <span className='bg-black text-colYellow rounded-full min-w-[32px] h-8 flex justify-center items-center font-medium text-lg'>
                2
              </span>
              <h3 className='text-xl text-[#6747e5] font-medium ml-2'>
                Детали посылки
              </h3>
            </div>
            <SApplicationDetail register={register} errors={errors} />
            <div className='flex items-center pt-8'>
              <span className='bg-black text-colYellow rounded-full min-w-[32px] h-8 flex justify-center items-center font-medium text-lg'>
                3
              </span>
              <h3 className='text-xl text-[#6747e5] font-medium ml-2'>
                Данные получателя
              </h3>
            </div>
            <div className='flex items-center pl-10 pt-1 pb-5 relative'>
              <p className='text-sm text-gray-600 mr-2'>
                Укажите данные получателя
              </p>
              <div className='group'>
                <img
                  className='w-5 cursor-pointer group'
                  src={attention}
                  alt='*'
                />
                <div className='absolute w-72 p-4 bg-white shadow-[0_8px_34px_#00000026] z-[9999] top-10 left-5 hidden group-hover:block lg:rounded-2xl'>
                  <p className='text-xs sm:text-sm flex items-start'>
                    <img src={attention2} alt='*' />
                    <span className='ml-2'>
                      Выберите адрес и данные получателя из ваших сохраненных
                      адресов. Так же вы можете добавить новый адрес.
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <SApplicationReceiver onReceiver={handleReceiverData} />
            <div className='flex items-center pb-5 pt-8'>
              <span className='bg-black text-colYellow rounded-full min-w-[32px] h-8 flex justify-center items-center font-medium text-lg'>
                4
              </span>
              <h3 className='text-xl text-[#6747e5] font-medium ml-2'>
                Отправка
              </h3>
            </div>
            <SApplicationComment register={register} errors={errors} />
            <div className='md:flex justify-between items-center mt-12'>
              <div className='flex justify-end md:justify-start sm:max-w-[320px] w-full md:ml-0 ml-auto items-center bg-colYellow p-5'>
                <span className='text-lg'>Общая стоимость:</span>
                <span className='text-xl font-medium mx-1 '>
                  {tariff === 2
                    ? (parseFloat(parcelCost) + 4).toFixed(2)
                    : parcelCost
                    ? parcelCost
                    : '00.00'}
                  $
                </span>
              </div>
              <div className='flex justify-end items-center mt-8 md:mt-0 sm:max-w-[320px] w-full ml-auto'>
                <button
                  type='submit'
                  disabled={isButtonDisabled}
                  onClick={handleSubmit(onSubmitForm)}
                  className={`${
                    isButtonDisabled
                      ? 'opacity-50 hover:opacity-50 cursor-not-allowed'
                      : 'hover:opacity-80'
                  } uppercase font-medium p-5 text-lg rounded-lg bg-black text-white duration-150 w-full`}
                >
                  Оформить заявку
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={modalOpen} onClose={closeModal} content={modalContent} />
      {isLoading ? <Loading /> : ''}
    </>
  );
};

export default SApplicationItem;
