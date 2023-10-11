import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import OrderDeliveryForm from './OrderDeliveryForm';
import OrderDeliveryTariffs from './OrderDeliveryTariffs';
import { fetchCosts } from '../../api/costs';

const OrderDeliveryItem = () => {

  const { state } = useLocation();

  const [parcelCost, setParcelCost] = useState(state?.parcelCost);
  const [costs, setCosts] = useState('');

  useEffect(() => {
    (async () => {
      const { success, data } = await fetchCosts();
      if (success) {
        setCosts(data);
      }
    })();
  }, []);

  const onSubmit = (data) => {
    const cityParcelCost = costs?.find(
      (cost) =>
        cost?.fromCity === data?.senderCity?.value &&
        cost?.toCity === data?.receiverCity?.value
    );
    if (cityParcelCost) {
      const costPerKg = cityParcelCost.costPerKg;
      let parcelCost;
      if (data.parcelSize.value === 'custom') {
        const { width, length, height } = data;
        const parcelWeight = (width * length * height) / 5000;
        parcelCost = Math.max(parcelWeight, data.weight) * costPerKg;
      } else {
        parcelCost = data.parcelSize.value * costPerKg;
      }
      setParcelCost(parcelCost.toFixed(2));
    } else {
      alert('Цена доставки не указана! (из города / в город)');
    }
  };

  return (
    <div className='shadow-[0_8px_34px_#00000026] p-7 rounded-xl'>
      <div className='flex items-center pb-5'>
        <span className='bg-black text-colYellow rounded-full min-w-[32px] h-8 flex justify-center items-center font-medium text-lg'>1</span>
        <h3 className='text-xl text-[#6747e5] font-medium ml-2'>
          Основные параметры
        </h3>
      </div>
      <OrderDeliveryForm state={state} onSubmit={onSubmit} />
      <div className='flex items-center pb-5 pt-8'>
        <span className='bg-black text-colYellow rounded-full min-w-[32px] h-8 flex justify-center items-center font-medium text-lg'>2</span>
        <h3 className='text-xl text-[#6747e5] font-medium ml-2'>
          Выбор тарифа
        </h3>
      </div>
      <OrderDeliveryTariffs state={state} parcelCost={parcelCost} />
    </div>
  );
};

export default OrderDeliveryItem;
