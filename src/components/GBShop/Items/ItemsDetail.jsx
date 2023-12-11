import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { scrollToTop } from '../../../helpers/ScrollToTop/scrollToTop';
import { ContentLoading } from '../../../helpers/Loader/Loader';
import noImg from '../../../assets/images/no-image.svg';
import { fetchItemsDetail } from '../../../api/gb-shop/items';
import favourite from '../../../assets/gb-shop/icons/favourite.svg';

const ItemsDetail = () => {
  const [item, setItem] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { state } = useLocation();
  const { id } = useParams();

  useEffect(() => {
    scrollToTop();
    (async () => {
      setIsLoading(true);
      const { success, data } = await fetchItemsDetail(id);
      if (success) {
        setItem(data);
        setIsLoading(false);
      }
      setIsLoading(false);
    })();
  }, [id]);

  return (
    <div className='py-24 min-h-[991px] content'>
      <div className='bg-[#FBFBFB] py-2 px-5 my-4'>
        <h3 className='font-bold font-ubuntu text-[#030303] text-3xl'>
          {state?.from}
        </h3>
      </div>
      {isLoading ? (
        <ContentLoading extraStyle={380} />
      ) : (
        <div className='flex pt-5 space-x-8'>
          <div className='w-1/2'>
            <img src={item?.image} alt='*' />
          </div>
          <div className='w-1/2'>
            <div className='flex items-center pt-5'>
              <div className='min-w-[20px] w-5 h-5 rounded-full border border-gray-400'>
                <img
                  className='w-full h-full object-cover rounded-full'
                  src={item?.supplier?.avatar}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = noImg;
                  }}
                  alt='*'
                />
              </div>
              <p className='text-xs text-[#A7A9B7] ml-1 line-clamp-1 break-all'>
                {item?.supplier?.fullname}
              </p>
            </div>
            <div className='flex justify-between items-center my-3'>
              <h1 className='font-ubuntu text-3xl'>{item?.name}</h1>
              <div className='flex justify-center items-center w-8 h-8 min-w-[32px] bg-[#ebebeb] rounded-full cursor-pointer'>
                <img className='w-5' src={favourite} alt='*' />
              </div>
            </div>
            <div className='flex items-center'>
              <h2 className='text-2xl font-medium'>$ {item?.cost}</h2>
              <h3 className='text-[#666] line-through ml-2 mr-5'>
                $ {item?.cost}
              </h3>
              <span className='bg-[#DA3F3F] px-2 py-[3px] text-white rounded-3xl text-xs'>
                Эконом 30%
              </span>
            </div>
            <p className='py-7'>{item?.description}</p>
            <p className='text-sm mb-2'>Количество</p>
            <div className='flex pb-5'>
              <div className='border rounded-tl-sm rounded-bl-sm border-black w-14 h-10 flex justify-center items-center font-medium cursor-pointer'>
                -
              </div>
              <div className='border border-y-black min-w-[60px] px-1 flex justify-center items-center'>
                1
              </div>
              <div className='border rounded-tr-sm rounded-br-sm border-black w-14 h-10 flex justify-center items-center font-medium cursor-pointer'>
                +
              </div>
              <button className='h-10 ml-4 bg-black text-white max-w-xs w-full rounded-sm'>
                В корзину
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemsDetail;
