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

  const lastAlaketDatas = alaket?.slice()?.sort((a, b) => {
    const dateA = new Date(a.dateCreated);
    const dateB = new Date(b.dateCreated);
    return dateB - dateA;
  });

  return (
    <>
      {loading ? (
        <ContentLoading extraStyle='480px' />
      ) : error ? (
        <ErrorServer />
      ) : lastAlaketDatas?.length ? (
        <div className='grid mm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 sm:gap-5 lg:gap-8 mt-10'>
          {lastAlaketDatas?.map((el) => (
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
