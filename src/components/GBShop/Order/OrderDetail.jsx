import { useEffect, useState } from 'react';
import Select from 'react-select';
import { Controller, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import ModalGBShop from '../../../helpers/Modals/ModalGBShop';
import noImg from '../../../assets/images/no-image.svg';
import { ContentLoading } from '../../../helpers/Loader/Loader';
import { payForParcel } from '../../../api/gb-shop/order';
import { useLocation } from 'react-router-dom';

const OrderDetail = () => {
  const [openModal, setOpenModal] = useState(false);
  const [totalCost, setTotalCost] = useState(null);
  const { cartItems, loading } = useSelector((state) => state?.cartItems);
  const { addresses } = useSelector((state) => state?.addresses);
  const { userID } = useSelector((state) => state?.user);

  const { state } = useLocation();
  const currency = 89.33;

  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const closeModal = () => {
    setOpenModal(false);
  };

  const addressOptions = addresses?.map((el) => ({
    value: el?.id,
    label:
      el?.type === 'custom'
        ? el?.country?.nameRu + ', ' + el?.city?.nameRu + ', ' + el?.address
        : el?.country?.nameRu +
          ', ' +
          el?.city?.nameRu +
          ', ' +
          el?.nameAddress,
  }));

  useEffect(() => {
    const calculateTotalQuantity = () => {
      const total = cartItems?.reduce((acc, item) => {
        if (item?.memory !== '' && item?.memory !== null) {
          return acc + item?.memory?.addCost * item.quantity;
        } else {
          if (item?.item?.issale) {
            return acc + item?.item?.costSale * item.quantity;
          } else {
            return acc + item?.item?.cost * item.quantity;
          }
        }
      }, 0);
      setTotalCost(total);
    };

    calculateTotalQuantity();
  }, [cartItems]);

  const onSubmit = (data) => {
    payForParcel(data, cartItems, userID, state);
  };

  return (
    <>
      {loading ? (
        <ContentLoading extraStyle={480} />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className='pt-5 md:pt-16'>
          <div className='md:flex md:space-x-5 lg:space-x-10'>
            <div className='md:w-2/5 pb-5 md:pb-0'>
              <div className='relative'>
                <h3 className='font-medium mb-3 text-[#484848]'>
                  Адрес доставки
                </h3>
                <p
                  className={`${
                    addresses?.length ? 'hidden' : ''
                  } opacity-50 -mt-2 mb-2 text-sm`}
                >
                  Вы еще не добавили адрес для доставки. Добавьте новый адрес.
                </p>
                {addresses?.length ? (
                  <>
                    <Controller
                      name='address'
                      control={control}
                      rules={{
                        required: 'Поле обязательно к заполнению!',
                      }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={addressOptions}
                          placeholder='Выберите адрес доставки'
                          menuPortalTarget={document.body}
                          styles={{
                            control: (provided, state) => ({
                              ...provided,
                              padding: '8px',
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
                      )}
                    />
                    {errors?.address && (
                      <p className='text-red-500 mt-1 text-sm'>
                        {errors?.address.message || 'Error!'}
                      </p>
                    )}
                    <p
                      onClick={() => {
                        setOpenModal(true);
                      }}
                      className={`${
                        addresses?.length ? '' : 'hidden'
                      } text-xs font-medium opacity-60 cursor-pointer underline text-right mt-2`}
                    >
                      Добавить новый
                    </p>
                  </>
                ) : (
                  <div
                    onClick={() => {
                      setOpenModal(true);
                    }}
                    className={`${
                      addresses?.length ? 'hidden' : ''
                    } font-medium hover:opacity-80 px-4 h-12 rounded-md bg-black text-white duration-150 sm:max-w-xs w-full mt-5 cursor-pointer flex justify-center items-center`}
                  >
                    Добавить новый адрес
                  </div>
                )}
              </div>
              <div className='pt-5'>
                <h3 className='font-medium mb-3 text-[#484848]'>Комментарий</h3>
                <textarea
                  className='w-full border border-colGray2 p-4 rounded-md focus:border-black focus:outline-none resize-none'
                  placeholder='Комментарий'
                  {...register('comment', {
                    required: false,
                  })}
                />
              </div>
            </div>
            <div className='md:w-3/5 md:p-5 rounded-md md:bg-[#F5F5F5] space-y-5'>
              {cartItems?.map((el, index) => (
                <div key={index} className='flex'>
                  <div className='sm:w-32 sm:h-32 sm:min-w-[128px] w-28 h-28 min-w-[112px] rounded-md overflow-hidden bg-white'>
                    <img
                      className='w-full h-full object-contain'
                      src={el?.item?.image}
                      alt='*'
                    />
                  </div>
                  <div className='flex flex-col justify-between w-full'>
                    <div className='pl-3 pt-2'>
                      <h5 className='font-medium line-clamp-2 break-all'>
                        {el?.item?.name}
                      </h5>
                      <div className='flex items-center py-2'>
                        <span className='text-sm text-[#888993]'>
                          Количество:
                        </span>
                        <p className='ml-1 text-sm font-medium'>
                          {el?.quantity}
                        </p>
                      </div>
                      <div className='flex items-center'>
                        <div className='min-w-[24px] w-6 h-6 rounded-full overflow-hidden border border-gray-300 bg-white'>
                          <img
                            className='w-full h-full object-contain rounded-full p-[2px]'
                            src={el?.item?.supplier?.avatar}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = noImg;
                            }}
                            alt='*'
                          />
                        </div>
                        <p className='text-sm text-[#A7A9B7] ml-1 line-clamp-1 break-all'>
                          {el?.item?.supplier?.fullname}
                        </p>
                      </div>
                    </div>
                    {el && el.memory !== '' && el.memory !== null ? (
                      <div className='font-medium ml-3 text-right'>
                        $ {(el?.memory?.addCost * el?.quantity)?.toFixed(1)}{' '}
                        <p className='text-xs ml-1'>
                          (
                          {(
                            el?.memory?.addCost *
                            currency *
                            el?.quantity
                          ).toFixed(1)}{' '}
                          с)
                        </p>
                      </div>
                    ) : (
                      <div className='font-medium ml-3 text-right'>
                        {el?.item?.issale
                          ? `$${el?.item?.costSale?.toFixed(1)}`
                          : `$${el?.item?.cost?.toFixed(1)}`}
                        <p className='text-xs ml-1'>
                          (
                          {el?.item?.issale
                            ? (el?.item?.costSale * currency)?.toFixed(1)
                            : (el?.item?.cost * currency)?.toFixed(1)}{' '}
                          с)
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div className='space-y-2 pt-4'>
                <div className='flex justify-between items-center'>
                  <span className='text-[#484848]'>Товары</span>
                  <span className='text-[#484848]'>
                    {cartItems?.length} товара
                  </span>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='text-[#484848]'>Доставка</span>
                  <span className='text-[#484848]'>Включено в стоимость</span>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='text-[#484848]'>Итого к оплате</span>
                  <span className='text-black font-bold'>
                    {totalCost?.toFixed(1)} ${' '}
                    <span className='text-sm font-medium'>
                      ({(totalCost * currency)?.toFixed(1)} c)
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className='flex justify-end pt-10'>
            <button
              type='button'
              onClick={handleSubmit(onSubmit)}
              disabled={!addresses?.length}
              className={`${
                addresses?.length
                  ? 'hover:opacity-80'
                  : 'opacity-60 cursor-not-allowed'
              } font-medium px-4 h-14 rounded-md bg-black text-white duration-150 sm:max-w-xs w-full`}
            >
              Подтвердить
            </button>
          </div>
        </form>
      )}
      <ModalGBShop isOpen={openModal} onClose={closeModal} />
    </>
  );
};

export default OrderDetail;
