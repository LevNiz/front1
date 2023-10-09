import { useEffect, useState } from 'react';
import CalcDeliveryForm from './CalcDeliveryForm';
import { fetchCosts } from '../../api/costs';

const CalcDeliveryItem = () => {
  const [costs, setCosts] = useState('');

  useEffect(() => {
    (async () => {
      const { success, data } = await fetchCosts();
      if (success) {
        setCosts(data);
      }
    })();
  }, []);



  const onSubmitCalc = (data) => {
    console.log(data)
    const getCost = costs?.find(
      (cost) =>
        cost?.fromCity === data?.senderCity?.value &&
        cost?.toCity === data?.receiverCity?.value
    );

    if (getCost) {
      const costPerKg = getCost.costPerKg;
      console.log(costPerKg);
    } else {
      console.log('Нет данных о стоимости доставки для данной пары городов.');
    }
  };

  return (
    <div className='shadow-[0_4px_15px_#00000026] p-8 rounded-xl'>
      <CalcDeliveryForm onSubmit={onSubmitCalc} />
    </div>
  );
};

export default CalcDeliveryItem;
