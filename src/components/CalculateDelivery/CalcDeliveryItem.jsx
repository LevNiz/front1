import { useEffect, useState } from 'react';
import CalcDeliveryForm from './CalcDeliveryForm';
import { fetchCosts } from '../../api/costs';

const CalcDeliveryItem = () => {
  const [costs, setCosts] = useState('');
  const [parcelCost, setParcelCost] = useState('');

  useEffect(() => {
    (async () => {
      const { success, data } = await fetchCosts();
      if (success) {
        setCosts(data);
      }
    })();
  }, []);

  const onSubmitCalc = (data) => {
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

  console.log(parcelCost);

  return (
    <div className='shadow-[0_4px_15px_#00000026] p-8 rounded-xl'>
      <CalcDeliveryForm onSubmit={onSubmitCalc} />
    </div>
  );
};

export default CalcDeliveryItem;
