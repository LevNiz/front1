import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { NavLink, useNavigate } from 'react-router-dom';
import shopingCart from '../../../assets/gb-shop/icons/shopping-cart.svg';
import favourite from '../../../assets/gb-shop/icons/favorite.svg';
import share from '../../../assets/gb-shop/icons/share.svg';
import noImg from '../../../assets/images/no-image.jpeg';
import GBSHopEmpty from '../../../helpers/Errors/GBSHopEmpty';
import { ContentLoading } from '../../../helpers/Loader/Loader';
import { ErrorServer } from '../../../helpers/Errors/ErrorServer';
import {
  addToFavorites,
  removeFromFavorites,
} from '../../../api/gb-shop/items';
import { addToCart, removeFromCart } from '../../../api/gb-shop/basket';
import { toastModal } from '../../../helpers/Modals/toastModal';

const CategorySlider = ({ items, loading, error }) => {
  const { userID, user } = useSelector((state) => state?.user);
  const { favItems } = useSelector((state) => state?.favItems);
  const { cartItems } = useSelector((state) => state?.cartItems);
  const { userData } = useSelector((state) => state?.user);
  const { depots } = useSelector((state) => state?.depots);

  const navigate = useNavigate();
  const currency = 89.33;

  const handleOpenDepot = (cityID) => {
    const depotID = depots?.filter((depot) => depot?.city?.id == cityID);
    if (depotID?.length) {
      window.open(`/depots/${depotID[0]?.id}`, '_blank');
    } else {
      alert('В этом городе пока нет склада!');
    }
  };

  const copyToClipboard = (text) => {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    toastModal('Ссылка на товар скопирована!');
  };

  return (
    <div>
      {loading ? (
        <ContentLoading extraStyle={320} />
      ) : error ? (
        <div className='flex justify-center my-8 bg-gray-50 p-3'>
          <ErrorServer />
        </div>
      ) : items?.length ? (
        <div className='pt-5 gb-shop'>
          <Swiper
            modules={[Navigation]}
            slidesPerView={5}
            navigation={true}
            className='px-4 pb-20 sm:pb-24 pt-4'
            spaceBetween={20}
            breakpoints={{
              260: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              992: {
                slidesPerView: 4,
              },
              1200: {
                slidesPerView: 5,
              },
            }}
          >
            {items?.map((el) => (
              <SwiperSlide modules={[Navigation]} key={el?.id}>
                <div className='overflow-hidden rounded-xl border-2 border-gray-100 relative shadow-[rgba(17,_17,_26,_0.1)_0px_5px_20px]'>
                  <NavLink to={`/gb-shop/items/${el?.id}`}>
                    <div className='h-[120px] xs:h-[140px] sx:h-[180px] sm:h-[210px] overflow-hidden relative bg-gray-50'>
                      <img
                        className='w-full h-full object-cover'
                        src={el?.image}
                        onError={(e) => {
                          e.target.onError = null;
                          e.target.src = noImg;
                        }}
                        alt='*'
                      />
                      <div className='absolute bottom-0 left-0 w-full h-12 bg-[linear-gradient(180deg,_rgba(0,_0,_0,_0.0)_0%,_rgba(0,_0,_0,_0.50)_200%)]'></div>
                    </div>
                  </NavLink>
                  {el?.country && (
                    <img
                      className='absolute top-3 cursor-pointer left-3 min-w-[28px] mm:min-w-[32px] w-7 mm:w-8 h-7 mm:h-8 object-cover rounded-full'
                      src={el?.country?.icon}
                      onError={(e) => {
                        e.target.onError = null;
                        e.target.src = noImg;
                      }}
                      onClick={() => handleOpenDepot(el?.city?.id)}
                      alt='*'
                    />
                  )}
                  <div
                    onClick={() =>
                      copyToClipboard(
                        `https://givbox.ru/gb-shop/items/${el?.id}`
                      )
                    }
                    className='absolute top-2 mm:top-4 right-2 mm:right-4 w-7 mm:w-8 h-7 mm:h-8 cursor-pointer rounded-full bg-gray-300 bg-opacity-50 flex justify-center items-center'
                  >
                    <img src={share} alt='*' />
                  </div>
                  <div className='p-2'>
                    <div className='pt-[2px] pb-1 flex items-center'>
                      <p className='font-bold text-lg flex items-center'>
                        <span>$</span>
                        <span>
                          {el?.issale
                            ? el?.costSale?.toFixed(1)
                            : el?.cost?.toFixed(1)}
                        </span>
                      </p>
                      {el?.issale ? (
                        <p className='text-sm pl-1 pt-[2px] font-light text-[#848484] line-clamp-1 break-all'>
                          ({(el?.costSale * currency)?.toFixed(1)} с)
                        </p>
                      ) : (
                        <p className='text-sm pl-1 pt-[2px] font-light text-[#848484] line-clamp-1 break-all'>
                          ({(el?.cost * currency)?.toFixed(1)} с)
                        </p>
                      )}
                    </div>
                    <NavLink
                      to={`items/${el?.id}`}
                      state={{
                        from: el?.category?.nameRus,
                        category: el?.category?.id,
                      }}
                      className='font-medium w-max text-xs ss:text-sm line-clamp-1 break-all hover:underline sm:mb-2'
                    >
                      {el?.name}
                    </NavLink>
                    <div className='sm:flex justify-between items-center'>
                      <div className='flex items-center pt-1'>
                        <div className='min-w-[20px] w-5 h-5 rounded-full border border-gray-400'>
                          <img
                            className='w-full h-full object-cover rounded-full'
                            src={el?.supplier?.avatar || noImg}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = noImg;
                            }}
                            alt='*'
                          />
                        </div>
                        <p className='text-xs text-[#A7A9B7] ml-1 line-clamp-1 break-all'>
                          {el?.supplier?.fullname || 'Не указана'}
                        </p>
                      </div>
                      <div className='flex justify-end items-center space-x-2'>
                        <div
                          onClick={async () => {
                            if (user) {
                              if (
                                favItems?.some((item) => item?.id === el?.id)
                              ) {
                                await removeFromFavorites(userID, el?.id);
                              } else {
                                await addToFavorites(
                                  userID,
                                  el,
                                  userData?.fullname,
                                  user?.access
                                );
                              }
                            } else {
                              navigate('/auth/sign-in');
                            }
                          }}
                          className={`${
                            favItems?.some((item) => item?.id === el?.id)
                              ? 'bg-colYellow'
                              : 'bg-gray-100'
                          } flex justify-center items-center w-7 sm:w-8 h-7 sm:h-8 min-w-[28px] sm:min-w-[32px] rounded-full cursor-pointer`}
                        >
                          <img className='w-4 sm:w-5' src={favourite} alt='*' />
                        </div>
                        <div
                          onClick={async () => {
                            if (user) {
                              if (
                                cartItems?.some(
                                  (item) => item?.item?.id === el?.id
                                )
                              ) {
                                await removeFromCart(userID, el?.id);
                              } else {
                                await addToCart(
                                  userID,
                                  el,
                                  userData?.fullname,
                                  user?.access,
                                  'addFromCards'
                                );
                              }
                            } else {
                              navigate('/auth/sign-in');
                            }
                          }}
                          className={`${
                            cartItems?.some((item) => item?.item?.id === el?.id)
                              ? 'bg-colYellow'
                              : 'bg-gray-100'
                          } flex justify-center items-center w-7 sm:w-8 h-7 sm:h-8 min-w-[28px] rounded-full cursor-pointer`}
                        >
                          <img
                            className='w-4 sm:w-5'
                            src={shopingCart}
                            alt='*'
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        <div className='flex justify-center my-8 bg-gray-50 p-3'>
          <GBSHopEmpty
            title='Ничего не нашли!'
            desc='В этой категории пока нет товаров.'
          />
        </div>
      )}
    </div>
  );
};

export default CategorySlider;
