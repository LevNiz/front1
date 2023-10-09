import { useEffect, useState } from 'react';
import CalcDeliveryForm from './CalcDeliveryForm';
import { fetchCosts } from '../../api/costs';

const CalcDeliveryItem = () => {
  const [costs, setCosts] = useState('');
  const [parcelCost, setParcelCost] = useState('');
  const [scopeWeight, setScopeWeight] = useState(false);

  useEffect(() => {
    (async () => {
      const { success, data } = await fetchCosts();
      if (success) {
        setCosts(data);
      }
    })();
  }, []);

  const onSubmitCalc = (data) => {
    const parcelCost = costs?.find(
      (cost) =>
        cost?.fromCity === data?.senderCity?.value &&
        cost?.toCity === data?.receiverCity?.value
    );

    if (parcelCost) {
      const costPerKg = parcelCost.costPerKg;
      setParcelCost(data.parcelSize.value * costPerKg);

      const { width, length, height, weight } = data;
      const parcelWeight = (width * length * height) / 5000;

      setScopeWeight(parcelWeight > weight);
    }
  };

  return (
    <div className='shadow-[0_4px_15px_#00000026] p-8 rounded-xl'>
      <CalcDeliveryForm onSubmit={onSubmitCalc} />
    </div>
  );
};

export default CalcDeliveryItem;
