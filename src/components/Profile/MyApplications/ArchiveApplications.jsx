import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchApplicationsNextPage,
  fetchArchiveApplications,
} from '../../../api/applications';
import { ContentLoading } from '../../../helpers/Loader/Loader';
import { NavLink } from 'react-router-dom';
import parcelCar from '../../../assets/images/parcel-car.svg';
import { ErrorServer } from '../../../helpers/Errors/ErrorServer';
import { ErrorEmpty } from '../../../helpers/Errors/ErrorEmpty';
import { useInView } from 'react-intersection-observer';

const ArchiveApplications = () => {
  const { userID } = useSelector((state) => state?.user);
  const { loading, error, archiveApplications } = useSelector(
    (state) => state?.applications
  );
  const [scrollLoading, setScrollLoading] = useState(false);
  const [nextPage, setNextPage] = useState(null);

  const dispatch = useDispatch();
  const [ref, inView] = useInView();

  useEffect(() => {
    (async () => {
      const { data } = await fetchArchiveApplications(userID, dispatch);
      if (data?.next) {
        setNextPage(data?.next);
      } else {
        setNextPage(null);
      }
    })();
  }, [userID, dispatch]);

  const handleIntersection = async () => {
    if (nextPage) {
      setScrollLoading(true);
      const { data } = await fetchApplicationsNextPage(
        dispatch,
        nextPage,
        archiveApplications
      );
      if (data?.next) {
        setNextPage(data?.next);
        setScrollLoading(false);
      } else {
        setScrollLoading(false);
        setNextPage(null);
      }
    }
  };

  useEffect(() => {
    if (inView) {
      handleIntersection();
    }
  }, [inView]);

  return (
    <div className='flex flex-col space-y-5 py-8'>
      {loading ? (
        <ContentLoading extraStyle='320px' />
      ) : error ? (
        <ErrorServer />
      ) : archiveApplications?.length ? (
        <>
          {archiveApplications?.map((el) => (
            <NavLink
              key={el?.id}
              to={`/applications/${el?.id}`}
              className='w-full bg-colBgGray2 rounded-[18px] p-3 ss:p-5'
            >
              <div className='flex justify-between items-center'>
                <div className='w-full'>
                  <h4 className='text-sm ss:text-base font-medium whitespace-nowrap text-ellipsis overflow-hidden'>
                    Заявка {el?.toCountry?.code + el?.toCity?.code + el?.id}
                  </h4>
                </div>
                <div className='max-w-[20%] sm:max-w-[auto] rounded-lg md:rounded-2xl flex justify-center sm:px-5 sm:py-2 px-2 py-[2px] bg-gray-600'>
                  <span className='text-[8px] text-white sm:text-xs sm:font-medium text-ellipsis overflow-hidden whitespace-nowrap'>
                    В ожидании
                  </span>
                </div>
              </div>
              <div className='flex justify-between pt-2'>
                <div className='max-w-[33%] break-all text-center'>
                  <span className='text-colGray2 text-[10px] ss:text-xs sm:text-sm'>
                    Откуда?
                  </span>
                  <h4 className='text-[10px] ss:text-xs sm:text-sm font-medium mt-1'>
                    {el?.fromCity
                      ? el?.fromCountry?.nameRu + ', ' + el?.fromCity?.nameRu
                      : 'Не указано'}
                  </h4>
                </div>
                <div className='max-w-[33%] break-all text-center'>
                  <span className='text-colGray2 text-[10px] ss:text-xs sm:text-sm'>
                    Дата доставки
                  </span>
                  <h4 className='text-[10px] ss:text-xs sm:text-sm font-medium mt-1'>
                    {el?.dateCreated
                      ? el?.dateCreated.split('T')[0]
                      : 'Не указано'}
                  </h4>
                </div>
                <div className='max-w-[33%] break-all text-center'>
                  <span className='text-colGray2 text-[10px] ss:text-xs sm:text-sm'>
                    Куда?
                  </span>
                  <h4 className='text-[10px] ss:text-xs sm:text-sm font-medium mt-1'>
                    {el?.toCity
                      ? el?.toCountry?.nameRu + ', ' + el?.toCity?.nameRu
                      : 'Не указано'}
                  </h4>
                </div>
              </div>
              <div className='md:flex justify-between items-center mt-2'>
                <div className='flex items-center'>
                  <div className='sm:min-h-[23px] min-h-[15px] ss:min-h-[18px] min-w-[15px] ss:min-w-[18px] sm:min-w-[23px] p-2 rounded-full bg-colYellow'></div>
                  <span className='bg-colYellow h-[2px] w-full md:w-[90px]'></span>
                  <div className='p-1.5 ss:p-2 rounded-full bg-colYellow'>
                    <img
                      className='min-w-[15px] ss:min-w-[18px] sm:min-w-[22px]'
                      src={parcelCar}
                      alt='*'
                    />
                  </div>
                  <span className='bg-black h-[2px] w-full md:w-[90px]'></span>
                  <div className='sm:min-h-[23px] min-h-[15px] ss:min-h-[18px] min-w-[15px] ss:min-w-[18px] sm:min-w-[23px] p-2 rounded-full bg-black'></div>
                </div>
              </div>
            </NavLink>
          ))}
        </>
      ) : (
        <ErrorEmpty
          title='К сожалению, нет архивных заявок.'
          desc='Здесь будут ваши архивные заявки.'
        />
      )}
      {!loading && (
        <div ref={ref} className='p-1'>
          {scrollLoading && <ContentLoading />}
        </div>
      )}
    </div>
  );
};

export default ArchiveApplications;
