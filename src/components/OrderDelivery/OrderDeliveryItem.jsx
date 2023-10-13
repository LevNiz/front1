import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import OrderDeliveryForm from './OrderDeliveryForm';
import { fetchCosts } from '../../api/costs';
import OrderDeliveryDetail from './OrderDeliveryDetail';
import OrderDeliverySender from './OrderDeliverySender';
import OrderDeliveryReceiver from './OrderDeliveryReceiver';
import OrderDeliveryComment from './OrderDeliveryComment';
import { useForm } from 'react-hook-form';
import editIcon from './../../assets/icons/edit.svg';
import { postRequest } from '../../api/request';
import { Loading } from '../../helpers/Loader/Loader';
import Modal from '../../helpers/Modals/Modal';

const OrderDeliveryItem = () => {
  const { state } = useLocation();
  const {
    handleSubmit,
    register,
    control,
    watch,
    formState: { errors },
  } = useForm();

  const [parcelCost, setParcelCost] = useState(state?.parcelCost);
  const [costs, setCosts] = useState('');
  const [params, setParams] = useState(state);
  const [isDisabled, setIsDisabled] = useState(false);
  const [tariff, setTariff] = useState(state?.tariff);
  const [isLoading, setIsLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState();

  const dateArrival = watch('dateArrival');
  const senderName = watch('senderName');
  const senderPhone = watch('senderPhone');
  const receiverName = watch('receiverName');
  const receiverPhone = watch('receiverPhone');
  const comment = watch('comment');

  const isButtonDisabled = !(
    dateArrival &&
    senderName &&
    senderPhone &&
    receiverName &&
    receiverPhone &&
    comment
  );

  useEffect(() => {
    (async () => {
      const { success, data } = await fetchCosts();
      if (success) {
        setCosts(data);
      }
    })();
  }, []);

  const closeModal = () => {
    setModalOpen(false);
  };

  const onHandleTariff = (data) => {
    setTariff(data);
  };

  const onSubmitCalc = (data) => {
    const orderData = {};
    Object.assign(orderData, data);
    setParams({ orderData });
    setIsDisabled(false);
    const cityParcelCost = costs?.find(
      (cost) =>
        cost?.fromCity === data?.senderCity?.value &&
        cost?.toCity === data?.receiverCity?.value
    );
    if (cityParcelCost) {
      const costPerKg = cityParcelCost.costPerKg;
      let cost;
      if (data.parcelSize.value === 'custom') {
        const { width, length, height } = data;
        const parcelWeight = (width * length * height) / 5000;
        if (tariff === 2) {
          cost = Math.max(parcelWeight, data.weight) * costPerKg + 4;
        } else {
          cost = Math.max(parcelWeight, data.weight) * costPerKg;
        }
      } else {
        if (tariff === 2) {
          cost = data.parcelSize.weight * costPerKg + 4;
        } else {
          cost = data.parcelSize.weight * costPerKg;
        }
      }
      setParcelCost(cost.toFixed(2));
    } else {
      alert('Цена доставки не указана! (из города / в город)');
    }
  };

  const onSubmitForm = async (data) => {
    // setIsLoading(true);
    const requestData = { ...params, ...data };
    requestData.cost = tariff === 2 ? Number(parcelCost) + 4 : parcelCost;
    const { success } = await postRequest(requestData);
    if (success) {
      setIsLoading(false);
      // setModalOpen(true);
      // setModalContent('successRequest');
    } else {
      setIsLoading(false);
    }
  };

  console.log(state)

  return (
    <>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <div className='shadow-[0_8px_34px_#00000026] p-7 rounded-xl'>
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
            <OrderDeliveryForm
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
            <OrderDeliveryDetail register={register} errors={errors} />
            <div className='flex items-center pb-5 pt-8'>
              <span className='bg-black text-colYellow rounded-full min-w-[32px] h-8 flex justify-center items-center font-medium text-lg'>
                3
              </span>
              <h3 className='text-xl text-[#6747e5] font-medium ml-2'>
                Данные отправителя
              </h3>
            </div>
            <OrderDeliverySender
              register={register}
              errors={errors}
              control={control}
            />
            <div className='flex items-center pb-5 pt-8'>
              <span className='bg-black text-colYellow rounded-full min-w-[32px] h-8 flex justify-center items-center font-medium text-lg'>
                4
              </span>
              <h3 className='text-xl text-[#6747e5] font-medium ml-2'>
                Данные получателя
              </h3>
            </div>
            <OrderDeliveryReceiver
              register={register}
              errors={errors}
              control={control}
            />
            <div className='flex items-center pb-5 pt-8'>
              <span className='bg-black text-colYellow rounded-full min-w-[32px] h-8 flex justify-center items-center font-medium text-lg'>
                5
              </span>
              <h3 className='text-xl text-[#6747e5] font-medium ml-2'>
                Отправка
              </h3>
            </div>
            <OrderDeliveryComment register={register} errors={errors} />
            <div className='flex justify-between items-center mt-12'>
              <div className='flex items-center bg-colYellow w-max p-5'>
                <span className='text-xl font-medium'>Общая стоимость:</span>
                <span className='text-xl font-medium mx-1 '>
                  {tariff === 2 ? Number(parcelCost) + 4 : parcelCost}$
                </span>
              </div>
              <div className='flex justify-end items-center max-w-[320px] w-full ml-auto'>
                <button
                  type='submit'
                  disabled={isButtonDisabled}
                  className={`${
                    isButtonDisabled
                      ? 'opacity-50 hover:opacity-50 cursor-not-allowed'
                      : 'hover:opacity-80'
                  } uppercase font-medium p-5 text-lg rounded-lg bg-[#6747e5] text-white duration-150 w-full`}
                >
                  Оформить заявку
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      <Modal isOpen={modalOpen} onClose={closeModal} content={modalContent} />
      {isLoading ? <Loading /> : ''}
    </>
  );
};

export default OrderDeliveryItem;
