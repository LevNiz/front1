import { useEffect } from 'react';
import { fetchCities } from '../../api/cities';
import { useDispatch, useSelector } from 'react-redux';
import { CalcDeliveryForm } from './CalcDeliveryForm';

const CalcDeliveryItem = () => {
  const { cities } = useSelector((state) => state?.cities);

  const dispatch = useDispatch();

  const cityOptions = cities?.map((el) => ({
    value: el?.id,
    label: el?.nameRu,
  }));

  const onSubmitCalc = (data) => {
    console.log(data)
  }

  useEffect(() => {
    (async () => {
      await fetchCities(dispatch);
    })();
  }, []);

  return (
    <div className='shadow-[0_4px_15px_#00000026] p-8 rounded-xl'>
      <CalcDeliveryForm onSubmit={onSubmitCalc} cityOptions={cityOptions} />
    </div>
  );
};

export default CalcDeliveryItem;
