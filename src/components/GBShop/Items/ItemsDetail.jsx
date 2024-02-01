import { useEffect, useRef, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { scrollToTop } from '../../../helpers/ScrollToTop/scrollToTop';
import { ButtonLoading, ContentLoading } from '../../../helpers/Loader/Loader';
import ItemsSlider from './ItemsSlider';
import CategorySlider from '../MainPage/CategorySlider';
import Select from 'react-select';
import {
  addToFavorites,
  fetchItemsDetail,
  fetchSimilarItems,
  removeFromFavorites,
} from '../../../api/gb-shop/items';
import { useSelector } from 'react-redux';
import { addToCart } from '../../../api/gb-shop/basket';
import favorite from '../../../assets/gb-shop/icons/favorite.svg';
import rightArrow from '../../../assets/gb-shop/icons/right.svg';
import noImg from '../../../assets/images/no-image.svg';
import share from '../../../assets/gb-shop/icons/share.svg';
import { toastModal } from '../../../helpers/Modals/toastModal';
import { currency } from '../../../constants/currency';

const ItemsDetail = () => {
  const { userID, user } = useSelector((state) => state?.user);
  const { cartItems } = useSelector((state) => state?.cartItems);
  const { favItems } = useSelector((state) => state?.favItems);
  const { userData } = useSelector((state) => state?.user);
  const { depots } = useSelector((state) => state?.depots);

  const { id } = useParams();
  const navigate = useNavigate();

  const mainSwiperRef = useRef(null);
  const [activeThumb, setActiveThumb] = useState('');
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [btnIsLoading, setBtnIsLoading] = useState(false);
  const [similarItems, setSimilarItems] = useState([]);
  const [itemCharacter, setItemCharacter] = useState({
    size: '',
    memory: '',
    color: '',
  });

  const handleSlideChange = () => {
    const currentIndex = mainSwiperRef.current?.activeIndex;
    const currentColor = item?.colors[currentIndex] || '';
    setItemCharacter({ ...itemCharacter, color: currentColor });
  };

  const itemCart = cartItems?.filter((el) => el?.item?.id === Number(id));

  const handleToggleFavorite = async () => {
    if (user) {
      if (favItems?.some((el) => el?.id === item?.id)) {
        await removeFromFavorites(userID, item?.id);
      } else {
        await addToFavorites(userID, item, userData?.fullname, user?.access);
      }
    } else {
      navigate('/auth/sign-in');
    }
  };

  const handleAddToCart = async () => {
    if (user) {
      setBtnIsLoading(true);
      const { success } = await addToCart(
        userID,
        item,
        userData?.fullname,
        user?.access,
        'addFromDetail',
        itemCharacter
      );
      if (success) {
        setBtnIsLoading(false);
      }
      setBtnIsLoading(false);
    } else {
      navigate('/auth/sign-in');
    }
  };

  const copyToClipboard = (text) => {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    toastModal('Ссылка на товар скопирована! ✅');
  };

  const handleOpenDepot = (cityID) => {
    const depotID = depots?.filter((depot) => depot?.city?.id == cityID);
    if (depotID?.length) {
      window.open(`/depots/${depotID[0]?.id}`, '_blank');
    } else {
      alert('В этом городе пока нет склада!');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        scrollToTop();
        setIsLoading(true);
        const { success, data } = await fetchItemsDetail(id);

        if (success) {
          setItem(data);

          const defaultSize = data?.sizes?.length ? data?.sizes[0] : '';
          const defaultColor = data?.colors?.length ? data?.colors[0] : '';
          const defaultMemory = data?.memory?.length ? data?.memory[0] : '';

          setItemCharacter({
            size: defaultSize,
            color: defaultColor,
            memory: defaultMemory,
          });

          setLoading(true);
          const { similarSuccess, similarData } = await fetchSimilarItems(
            data?.category?.id
          );
          if (similarSuccess) {
            setSimilarItems(similarData);
            setLoading(false);
          } else {
            setError(true);
            setLoading(false);
          }
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className='py-16 md:py-24 min-h-[991px]'>
      <div className='content'>
        <div className='bg-[#fbfbfb] py-1 lg:py-2 px-3 lg:px-5 my-4'>
          <h3 className='font-bold font-ubuntu text-[#030303] text-2xl lg:text-3xl'>
            {item?.category?.nameRus}
          </h3>
        </div>
      </div>
      {isLoading ? (
        <ContentLoading extraStyle={380} />
      ) : (
        <>
          <div className='content'>
            <div className='md:flex mm:pt-5 md:space-x-5 lg:space-x-8'>
              <div className='md:w-1/2 relative'>
                {item?.country?.icon && (
                  <div
                    onClick={() => handleOpenDepot(item?.city?.id)}
                    className='absolute top-3 right-3 cursor-pointer w-10 h-10 rounded-full overflow-hidden z-[999]'
                  >
                    <img
                      className='w-full h-full object-cover'
                      src={item?.country?.icon}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = noImg;
                      }}
                      alt='*'
                    />
                  </div>
                )}
                <div className='sm:min-h-[340px] lg:min-h-[470px] border border-gray-100 rounded-md p-3'>
                  <ItemsSlider
                    item={item}
                    activeThumb={activeThumb}
                    setActiveThumb={setActiveThumb}
                    mainSwiperRef={mainSwiperRef}
                    handleSlideChange={handleSlideChange}
                  />
                </div>
              </div>
              <div className='md:w-1/2'>
                <div className='flex items-center pt-5'>
                  <div className='min-w-[20px] w-5 h-5 rounded-full'>
                    <img
                      className='w-full h-full object-cover rounded-full'
                      src={item?.supplier?.avatar || noImg}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = noImg;
                      }}
                      alt='*'
                    />
                  </div>
                  <div className='flex justify-between items-center w-full'>
                    <p className='text-xs text-[#A7A9B7] ml-1 line-clamp-1 break-all'>
                      {item?.supplier?.fullname || 'Не указана'}
                    </p>
                    <div className='flex'>
                      <div
                        onClick={handleToggleFavorite}
                        className={`${
                          favItems?.some((el) => el?.id === item?.id)
                            ? 'bg-colYellow'
                            : 'bg-gray-100'
                        } flex justify-center items-center w-8 h-8 min-w-[32px] rounded-full cursor-pointer`}
                      >
                        <img className='w-5' src={favorite} alt='*' />
                      </div>
                      <div
                        onClick={() =>
                          copyToClipboard(
                            `https://givbox.ru/gb-shop/items/${item?.id}`
                          )
                        }
                        className='w-8 h-8 cursor-pointer rounded-full bg-gray-100 ml-2 flex justify-center items-center'
                      >
                        <img src={share} alt='*' />
                      </div>
                    </div>
                  </div>
                </div>
                <h1 className='font-medium font-ubuntu text-xl mm:text-3xl my-3'>
                  {item?.name}
                </h1>
                <div className='flex items-center'>
                  {item?.memory?.length > 0 ? (
                    <>
                      <h2 className='text-2xl font-medium'>
                        ${itemCharacter?.memory?.addCost?.toFixed(1)}
                      </h2>
                      <span className='ml-1 mr-3'>
                        (
                        {(itemCharacter?.memory?.addCost * currency)?.toFixed(
                          1
                        )}{' '}
                        с)
                      </span>
                    </>
                  ) : (
                    <>
                      <h2 className='text-2xl font-medium'>
                        {item?.issale
                          ? `$${item?.costSale?.toFixed(1)}`
                          : `$${item?.cost?.toFixed(1)}`}
                      </h2>
                      {item?.issale && (
                        <h3 className='text-[#666] line-through ml-2 mr-1'>
                          $ {item?.cost?.toFixed(1)}
                        </h3>
                      )}

                      <span className='ml-1 mr-3'>
                        (
                        {item?.issale
                          ? (item?.costSale * currency)?.toFixed(1)
                          : (item?.cost * currency)?.toFixed(1)}{' '}
                        с)
                      </span>
                      {item?.issale && (
                        <span className='bg-[#DA3F3F] px-2 py-[3px] text-white rounded-3xl text-xs'>
                          Эконом 30%
                        </span>
                      )}
                    </>
                  )}
                </div>
                {item?.colors?.length > 0 && (
                  <div className='lg:flex items-start pt-10'>
                    <h4 className='font-medium text-xl lg:pt-5 pr-7'>Цвета</h4>
                    <div className='flex flex-wrap space-x-2 pt-2 lg:pt-0'>
                      {item?.colors?.map((el, index) => (
                        <div
                          className={`${
                            itemCharacter?.color?.id === el?.id &&
                            'border-gray-300 border'
                          } cursor-pointer rounded-md min-w-[60px] max-w-[86px] w-max px-1 h-16 flex flex-col items-center justify-center`}
                          key={el?.id}
                          onClick={() => {
                            setItemCharacter({
                              ...itemCharacter,
                              color: el,
                            });
                            mainSwiperRef?.current?.slideTo(index);
                          }}
                        >
                          <div
                            style={{ background: el?.color }}
                            className='w-8 h-8 min-w-[32px] rounded-full'
                          ></div>
                          <p className='text-[10px] mt-1 line-clamp-1 break-all'>
                            {el?.nameRu}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {item?.sizes && (
                  <div className='lg:flex items-center pt-8'>
                    <h4 className='font-medium text-xl pr-7'>Размер</h4>
                    <ul className='flex flex-wrap'>
                      {item?.sizes?.map((el, index) => (
                        <li
                          className={`${
                            itemCharacter?.size === el && 'bg-black text-white'
                          } min-w-[40px] px-1 h-9 rounded-md border border-black flex justify-center items-center cursor-pointer mr-3 mt-3 lg:mt-0`}
                          key={index}
                          onClick={() =>
                            setItemCharacter({
                              ...itemCharacter,
                              size: el,
                            })
                          }
                        >
                          <span className='font-medium'>{el}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {item?.memory?.length > 0 && (
                  <div className='lg:flex items-center pt-8'>
                    <h4 className='font-medium text-xl pr-7 pb-2 lg:pb-0'>
                      Память
                    </h4>
                    <Select
                      options={item?.memory}
                      className='sm:max-w-[320px] w-full outline-none'
                      defaultValue={item?.memory[0]}
                      isSearchable={false}
                      getOptionLabel={(option) => (
                        <span>
                          RAM: <strong className='pr-3'>{option?.ram}</strong>{' '}
                          Встроенная: <strong>{option?.storage}</strong>
                        </span>
                      )}
                      getOptionValue={(option) => option?.id}
                      onChange={(selectedOption) => {
                        setItemCharacter({
                          ...itemCharacter,
                          memory: selectedOption,
                        });
                      }}
                      styles={{
                        control: (provided, state) => ({
                          ...provided,
                          padding: '5px',
                          boxShadow: state.isFocused ? 0 : 0,
                          border: state.isFocused ? '1px solid #999' : '',
                          '&:hover': {
                            border: state.isFocused ? '1px solid #999' : '',
                          },
                        }),
                        menuPortal: (provided) => ({
                          ...provided,
                          zIndex: 9999999,
                        }),
                        menu: (provided) => ({
                          ...provided,
                          position: 'absolute',
                        }),
                      }}
                    />
                  </div>
                )}
                <p className='py-7'>{item?.description}</p>
                <div className='flex pb-5'>
                  {itemCart?.length ? (
                    <NavLink
                      to='/gb-shop/basket'
                      className='h-12 bg-colYellow mm:max-w-xs w-full font-medium rounded-md flex justify-center items-center'
                    >
                      Перейти в корзину
                    </NavLink>
                  ) : (
                    <button
                      onClick={handleAddToCart}
                      className='h-12 bg-black text-white mm:max-w-xs w-full rounded-md'
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
                Заказ можно оплатить удобным для вас банковской картой. Также
                можете использовать ваши бонусы
              </p>
            </div>
            <div className='py-10'>
              <h4 className='font-bold text-xl py-2'>Доставка</h4>
              <p>
                Доставка товаров осуществляется курьером или на пунк выдачи
                заказов. Удобный способ доставки можно выбрать при оформлении
                заказа.
                <br />
                Для получения потребуется паспорт.
                <br />
                <br />
                Доставка и таможенное оформление уже включены в стоимость
              </p>
            </div>
          </div>
          <div className='mm:content'>
            <div className='flex justify-between items-center bg-[#FBFBFB] py-1 lg:py-2 px-3 lg:px-5 mt-12'>
              <h3 className='font-bold font-ubuntu text-[#030303] text-xl md:text-2xl lg:text-3xl'>
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
              items={similarItems?.slice(0, 10)}
              loading={loading}
              error={error}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ItemsDetail;
