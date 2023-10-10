import { useEffect, useState } from 'react';
import CalcDeliveryForm from './CalcDeliveryForm';
import { fetchCosts } from '../../api/costs';
import DeliveryTariffs from './DeliveryTariffs';

const CalcDeliveryItem = () => {
  const [costs, setCosts] = useState('');
  const [parcelCost, setParcelCost] = useState('');
  const [isClickedForm, setIsClickedForm] = useState(false);

  const handleButtonClick = () => {
    setIsClickedForm(false);
  };

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
      setIsClickedForm(true);
    } else {
      alert('Цена доставки не указана! (из города / в город)');
    }
  };

  return (
    <>
      <div
        className={`${
          isClickedForm ? 'pointer-events-none opacity-40' : ''
        } shadow-[0_8px_34px_#00000026] p-7 rounded-xl`}
      >
        <h3 className='text-xl text-[#6747e5] pb-3 font-medium'>
          Основные параметры
        </h3>
        <CalcDeliveryForm onSubmit={onSubmitCalc} />
      </div>
      {isClickedForm && (
        <DeliveryTariffs
          onButtonClick={handleButtonClick}
          parcelCost={parcelCost}
        />
      )}
    </>
  );
};

export default CalcDeliveryItem;
