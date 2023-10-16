import { useEffect } from 'react';
import { CalcDeliveryItem } from '../../components';
import { fetchCities } from '../../api/cities';
import { fetchCountries } from '../../api/countries';
import { useDispatch } from 'react-redux';
import { scrollToTop } from '../../helpers/ScrollToTop/scrollToTop';

const CalculateDelivery = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    scrollToTop();
    (async () => {
      await fetchCities(dispatch);
      await fetchCountries(dispatch);
    })();
  }, []);

  return (
    <div className='py-24 content min-h-[720px]'>
      <h1 className='text-2xl ss:text-3xl pt-5 pb-8 font-medium text-center'>
        Рассчитать доставку
      </h1>
      <CalcDeliveryItem />
    </div>
  );
};

export default CalculateDelivery;
