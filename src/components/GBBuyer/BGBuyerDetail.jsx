import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchBuyersDetail } from '../../api/buyer';
import { ContentLoading } from '../../helpers/Loader/Loader';
import noImg from '../../assets/images/no-ava.jpeg';
import instaTick from '../../assets/icons/insta-tick.png';
import star from '../../assets/icons/star.png';
import web from '../../assets/icons/application.png';
import whatsapp from '../../assets/icons/new-call.svg';

const BGBuyerDetail = () => {
  const [buyerItem, setBuyerItem] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const { success, data } = await fetchBuyersDetail(id);
      if (success) {
        setBuyerItem(data);
        setIsLoading(false);
      }
      setIsLoading(false);
    })();
  }, [id]);

  return (
    <div className='content min-h-[728px] py-20'>
      {isLoading ? (
        <ContentLoading extraStyle='580px' />
      ) : (
        <div className='md:flex pt-10 md:pt-20'>
          <div className='w-full md:w-2/5 text-center md:border-r-2 md:border-gray-300 py-10 md:pr-5'>
            <div className='w-36 min-w-[144px] h-36 rounded-full overflow-hidden p-[2px] border-2 border-colYellow mx-auto'>
              <img
                className='w-full h-full object-cover rounded-full'
                src={buyerItem?.avatar ? buyerItem?.avatar : noImg}
                alt='*'
              />
            </div>
            <div className='flex justify-center items-center pt-2'>
              <h2 className='font-medium text-lg'>{buyerItem?.fullname}</h2>
              <img className='ml-1 w-8' src={instaTick} alt='*' />
            </div>
            <p className='opacity-80 text-sm my-[2px]'>
              {buyerItem?.countries &&
                buyerItem?.countries
                  ?.map((country) => country?.nameRu)
                  .join(', ')}
            </p>
            <div className='flex justify-center items-center space-x-1 my-1'>
              <img className='w-4' src={star} alt='*' />
              <img className='w-4' src={star} alt='*' />
              <img className='w-4' src={star} alt='*' />
              <img className='w-4' src={star} alt='*' />
              <img className='w-4' src={star} alt='*' />
            </div>
            <p className='mm:text-xl italic mt-2'>{`'${buyerItem?.info}'`}</p>
          </div>
          <div className='w-full md:w-3/5 md:pt-16 md:pl-8'>
            <div className='flex items-center my-3'>
              <div className='min-w-[32px] w-8 h-8 rounded-full overflow-hidden bg-orange-400'>
                <img className='p-[6px]' src={web} alt='*' />
              </div>
              <p className='ml-2 opacity-70'>
                {buyerItem?.websites &&
                  buyerItem?.websites
                    ?.map((website) => website?.name)
                    .join(', ')}
              </p>
            </div>
            <div className='flex items-center my-5'>
              <div className='min-w-[32px] w-8 h-8 rounded-full overflow-hidden bg-orange-400'>
                <img className='p-[6px]' src={whatsapp} alt='*' />
              </div>
              <p className='ml-2 opacity-70'>{buyerItem?.phone}</p>
            </div>
            <div className='w-full sm:max-w-[340px] mt-8'>
              <button
                onClick={() =>
                  alert(
                    'Совсем скоро появится возможность отправлять сообщение!'
                  )
                }
                className='uppercase font-medium hover:opacity-80 p-4 rounded-lg bg-black text-white duration-150 w-full'
              >
                Написать сообщение
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BGBuyerDetail;
