import { useEffect, useState } from 'react';
import CalcDeliveryForm from './CalcDeliveryForm';
import { fetchCosts } from '../../../api/costs';
import CalcDeliveryTariffs from './CalcDeliveryTariffs';
import { useNavigate } from 'react-router-dom';
import { scrollToTop } from '../../../helpers/ScrollToTop/scrollToTop';
import { useDispatch, useSelector } from 'react-redux';

const CalcDeliveryItem = () => {
  const [isClickedForm, setIsClickedForm] = useState(false);
  const [orderData, setOrderData] = useState({});
  const [tariff, setTariff] = useState(null);
  const [tariffCost, setTariffCost] = useState({ standart: '', premium: '' });

  const { costs } = useSelector((state) => state?.costs);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleButtonClick = () => {
    setIsClickedForm(false);
    setTariff(!tariff);
  };

  const handleGetTariff = (data) => {
    setTariff(data);
  };

  console.log(tariff);

  useEffect(() => {
    (async () => {
      await fetchCosts(dispatch);
    })();
  }, [dispatch]);

  const onSubmitCalc = (data) => {
    const cityParcelCost = costs?.find(
      (cost) =>
        cost?.fromCity?.id === data?.senderCity?.value &&
        cost?.toCity?.id === data?.receiverCity?.value
    );
    if (cityParcelCost) {
      const costPerKg = cityParcelCost.costPerKg;
      const costPerKgMy = cityParcelCost?.costPerKgMy;
      let cost;
      if (data.parcelSize.value === 'custom') {
        const { width, length, height } = data;
        const parcelWeight = (width * length * height) / 5000;
        cost = Math.max(parcelWeight, data.weight);
      } else if (data.parcelSize.value === 'measurement') {
        cost = 0;
      } else {
        cost = Number(data.parcelSize.weight);
      }
      setTariffCost({
        standart: (costPerKg * cost)?.toFixed(2),
        premium: (costPerKgMy * cost)?.toFixed(2),
      });
      setIsClickedForm(true);
      setOrderData(data);
    } else {
      alert('На данный момент выбранный маршрут недоступен');
      setTariffCost(0);
      setIsClickedForm(true);
    }
  };

  return (
    <>
      <div
        className={`${
          isClickedForm ? 'pointer-events-none opacity-40' : ''
        } md:shadow-[0_8px_34px_#00000026] md:p-7 rounded-xl`}
      >
        <h3 className='text-xl text-[#6747e5] pb-3 font-medium'>
          Основные параметры
        </h3>
        <CalcDeliveryForm onSubmit={onSubmitCalc} />
      </div>
      {isClickedForm && (
        <div className='lg:flex mt-10'>
          <CalcDeliveryTariffs
            tariffCost={tariffCost}
            onHandleGetTariff={handleGetTariff}
          />
          <div className='lg:w-[33%] md:shadow-[0_8px_34px_#00000026] md:p-7 rounded-xl h-[fit-content]'>
            <button
              onClick={() => {
                handleButtonClick();
                scrollToTop();
              }}
              className='font-medium hover:opacity-80 p-4 rounded-lg bg-colYellow duration-150 mm:max-w-[320px] w-full mr-4 lg:mr-0'
            >
              Изменить параматеры
            </button>
            <button
              disabled={!tariff}
              onClick={() =>
                navigate('/applications/send-application', {
                  state: {
                    orderData: orderData,
                    tariff: tariff,
                    tariffCost: tariffCost,
                  },
                })
              }
              className={`${
                !tariff ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-80'
              } font-medium p-4 rounded-lg bg-black text-white duration-150 mm:max-w-[320px] w-full mt-4`}
            >
              Оформить заявку
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CalcDeliveryItem;
