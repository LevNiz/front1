import { useEffect } from 'react';
import SApplicationItem from './SApplicationItem';
import parcelSvg from '../../../assets/icons/service3.svg';
import { scrollToTop } from '../../../helpers/ScrollToTop/scrollToTop';
import { fetchCities } from '../../../api/cities';
import { fetchCountries } from '../../../api/countries';
import { useDispatch } from 'react-redux';

const SendApplication = () => {
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
      <div className='flex justify-center items-center pt-5 pb-12'>
        <h1 className='text-2xl xs:text-3xl font-medium text-center'>
          Оформление заявки
        </h1>
        <img className='hidden sm:block w-9 ml-2' src={parcelSvg} alt='*' />
      </div>
      <SApplicationItem />
    </div>
  );
};

export default SendApplication;
