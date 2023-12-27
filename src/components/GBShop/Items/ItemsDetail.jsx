import { useEffect, useState } from 'react';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import { scrollToTop } from '../../../helpers/ScrollToTop/scrollToTop';
import { ButtonLoading, ContentLoading } from '../../../helpers/Loader/Loader';
import ItemsSlider from './ItemsSlider';
import CategorySlider from '../MainPage/CategorySlider';
import noImg from '../../../assets/images/no-image.svg';
import {
  addToFavorites,
  fetchFavoriteItems,
  fetchItemsDetail,
  removeFromFavorites,
} from '../../../api/gb-shop/items';
import favorite from '../../../assets/gb-shop/icons/favorite.svg';
import rightArrow from '../../../assets/gb-shop/icons/right.svg';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, fetchBasketData } from '../../../api/gb-shop/basket';

const ItemsDetail = () => {
  const { userID } = useSelector((state) => state?.user);
  const { items, loading, error } = useSelector((state) => state?.items);
  const { categories } = useSelector((state) => state?.categories);
  const { cartItems } = useSelector((state) => state?.cartItems);
  const { state } = useLocation();
  const { id } = useParams();
  const dispatch = useDispatch();

  const [item, setItem] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [btnIsLoading, setBtnIsLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const itemCart = cartItems?.filter((el) => el?.item?.id === Number(id));

  const similarItems = items?.filter(
    (el) => el?.category?.id === item?.category?.id
  );

  const itemCategoryTitle = categories?.filter(
    (el) => el?.id === state?.category
  );

  const handleToggleFavorite = async () => {
    if (isFavorite) {
      await removeFromFavorites(userID, item?.id);
    } else {
      await addToFavorites(userID, item);
    }
    setIsFavorite(!isFavorite);
  };

  const handleAddToCart = async () => {
    setBtnIsLoading(true);
    const { success } = await addToCart(userID, item);
    if (success) {
      setBtnIsLoading(false);
    }
    setBtnIsLoading(false);
  };

  useEffect(() => {
    const unsubscribe = fetchFavoriteItems(userID, (favData) => {
      setIsFavorite(favData?.some((el) => el?.id === item?.id));
    });
    return () => unsubscribe();
  }, [userID, item?.id]);

  useEffect(() => {
    const unsubscribe = fetchBasketData(userID, dispatch);
    return () => unsubscribe();
  }, [userID, dispatch]);

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
          {itemCategoryTitle[0]?.nameRus}
        </h3>
      </div>
      {isLoading ? (
        <ContentLoading extraStyle={380} />
      ) : (
        <>
          <div className='flex pt-5 space-x-8'>
            <div className='w-1/2'>
              <div className='border border-gray-100 rounded-md overflow-hidden p-3'>
                <ItemsSlider slideImg={item?.image} />
              </div>
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
                <div
                  onClick={handleToggleFavorite}
                  className={`${
                    isFavorite ? 'bg-colYellow' : 'bg-gray-100'
                  } flex justify-center items-center w-8 h-8 min-w-[32px] rounded-full cursor-pointer`}
                >
                  <img className='w-5' src={favorite} alt='*' />
                </div>
              </div>
              <div className='flex items-center'>
                <h2 className='text-2xl font-medium'>$ {item?.costSale}</h2>
                <h3 className='text-[#666] line-through ml-2 mr-5'>
                  $ {item?.cost}
                </h3>
                <span className='bg-[#DA3F3F] px-2 py-[3px] text-white rounded-3xl text-xs'>
                  Эконом 30%
                </span>
              </div>
              <p className='py-7'>{item?.description}</p>
              <div className='flex pb-5'>
                {itemCart?.length ? (
                  <NavLink
                    to='/gb-shop/basket'
                    className='h-12 bg-colYellow max-w-xs w-full rounded-md flex justify-center items-center'
                  >
                    Перейти в корзину
                  </NavLink>
                ) : (
                  <button
                    onClick={handleAddToCart}
                    className='h-12 bg-black text-white max-w-xs w-full rounded-md'
                  >
                    {btnIsLoading ? <ButtonLoading /> : 'В корзину'}
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className='pt-10'>
            <h4 className='font-bold text-xl py-2'>Оплата</h4>
            <p>
              Et amet, eu, urna ut tortor, ut at amet nec felis tincidunt sed
              ultrices magna dignissim nulla tortor, pellentesque tincidunt
              commodo duis et nec, et elementum euismod in id arcu ut lacus
              elementum velit
              <br />
              <br />
              Et amet, eu, urna ut tortor, ut at amet nec felis tincidunt sed
              ultrices magna dignissim nulla tortor, pellentesque tincidunt
              commodo duis et nec, et elementum euismod in id arcu ut lacus
              elementum velit
            </p>
          </div>
          <div className='py-10'>
            <h4 className='font-bold text-xl py-2'>Доставка</h4>
            <p>
              Et amet, eu, urna ut tortor, ut at amet nec felis tincidunt sed
              ultrices magna dignissim nulla tortor, pellentesque tincidunt
              commodo duis et nec, et elementum euismod in id arcu ut lacus
              elementum velit
              <br />
              <br />
              Et amet, eu, urna ut tortor, ut at amet nec felis tincidunt sed
              ultrices magna dignissim nulla tortor, pellentesque tincidunt
              commodo duis et nec, et elementum euismod in id arcu ut lacus
              elementum velit
            </p>
          </div>
          <div className='flex justify-between items-center bg-[#FBFBFB] py-2 px-5 mt-12'>
            <h3 className='font-bold font-ubuntu text-[#030303] text-3xl'>
              Похожие товары
            </h3>
            <NavLink
              className='flex items-center justify-end'
              to='/gb-shop/items'
              state={{
                from: item?.category?.nameRus,
                category: item?.category?.id,
              }}
            >
              <span className='font-medium text-xl mr-2 text-[#FEDE2B]'>
                Все
              </span>
              <img src={rightArrow} alt='*' />
            </NavLink>
          </div>
          <CategorySlider
            items={similarItems}
            loading={loading}
            error={error}
          />
        </>
      )}
    </div>
  );
};

export default ItemsDetail;
