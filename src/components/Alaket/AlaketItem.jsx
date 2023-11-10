import { useEffect } from 'react';
import AlaketCard from './AlaketCard';
import { fetchAlaket } from '../../api/alaket';
import { useDispatch, useSelector } from 'react-redux';
import { ContentLoading } from '../../helpers/Loader/Loader';
import { ErrorEmpty } from '../../helpers/Errors/ErrorEmpty';
import { ErrorServer } from '../../helpers/Errors/ErrorServer';

const AlaketItem = () => {
  const dispatch = useDispatch();
  const { loading, error, alaket } = useSelector((state) => state?.alaket);

  useEffect(() => {
    (async () => {
      await fetchAlaket(dispatch);
    })();
  }, []);

  return (
    <>
      {loading ? (
        <ContentLoading extraStyle='480px' />
      ) : error ? (
        <ErrorServer />
      ) : alaket?.length ? (
        <div className='grid grid-cols-4 gap-8 mt-10'>
          {alaket?.map((el) => (
            <AlaketCard key={el?.id} el={el} />
          ))}
        </div>
      ) : (
        <ErrorEmpty
          title='По вашему запросу ничего не нашли.'
          desc='Здесь будет список складов.'
        />
      )}
    </>
  );
};

export default AlaketItem;
