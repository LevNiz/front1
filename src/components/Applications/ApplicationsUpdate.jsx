import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Select from 'react-select';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { ContentLoading, Loading } from '../../helpers/Loader/Loader';
import { ErrorServer } from '../../helpers/Errors/ErrorServer';
import {
  fetchApplicationsDetail,
  updateApplications,
} from '../../api/applications';
import { fetchParcelCategories } from '../../api/parcels';
import { tariffsData } from '../../constants/tariffsData';

import attention from '../../assets/icons/attention.svg';
import attention2 from '../../assets/icons/attention.svg';
import info from '../../assets/icons/attention2.svg';
import boxSize from '../../assets/images/box-size.jpeg';
import receptionPoint from '../../assets/icons/receptionPoint.svg';
import editIcon from '../../assets/icons/edit.svg';
import { fetchAddresses } from '../../api/addresses';
import ModalAddress from '../../helpers/Modals/ModalAddress';
import Modal from '../../helpers/Modals/Modal';
import { fetchCosts } from '../../api/costs';

const ApplicationsUpdate = () => {
  const [order, setOrder] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [params, setParams] = useState({});
  const [parcelData, setParcelData] = useState([]);
  const [isParcelSize, setIsParcelSize] = useState();
  const [scopeWeight, setScopeWeight] = useState(null);
  const [selectedTariff, setSelectedTariff] = useState(null);
  const [modalOpenAddress, setModalOpenAddress] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [receiver, setReceiver] = useState(order?.address);
  const [selectedSenderCity, setSelectedSenderCity] = useState();
  const [selectedReceiverCity, setSelectedReceiverCity] = useState();
  const [parcelCost, setParcelCost] = useState(null);
  const [services, setServices] = useState([]);

  const { costs } = useSelector((state) => state?.costs);
  const { cities } = useSelector((state) => state?.cities);
  const { userID } = useSelector((state) => state?.user);
  const { extraServices } = useSelector((state) => state?.extraServices);
  const dispatch = useDispatch();
  const { id } = useParams();

  const closeModalAddress = () => {
    setModalOpenAddress(false);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleAddresses = async () => {
    await fetchAddresses(userID, dispatch);
  };

  const handleChooseAddress = (address) => {
    setReceiver(address);
  };

  const handleServicesData = (data) => {
    setServices([...services, data]);
  };

  const handleServicesDelete = (serviceId) => {
    const updatedServices = services.filter(
      (service) => service.id !== serviceId
    );
    setServices(updatedServices);
  };

  const {
    handleSubmit,
    control,
    register,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: async () => {
      setIsLoading(true);
      const { success, data } = await fetchApplicationsDetail(id);
      if (success) {
        setOrder(data);
        setReceiver(data?.address);
        setSelectedTariff(data?.premium ? 2 : 1);
        setServices(
          extraServices?.filter((el) => data?.extraServices.includes(el?.id))
        );
        setIsParcelSize({
          value: data?.packageData
            ? data?.packageData?.id
            : data?.height > 0 &&
              data?.width > 0 &&
              data?.length > 0 &&
              data?.packageData === null
            ? 'custom'
            : 'measurement',
          label: data?.packageData
            ? `${data?.packageData?.nameRu} (${data?.packageData?.length}x${data?.packageData?.width}x${data?.packageData?.height} см)`
            : data?.height > 0 &&
              data?.width > 0 &&
              data?.length > 0 &&
              data?.packageData === null
            ? 'Точные'
            : 'Измерить на складе',
          weight: data?.packageData ? data?.packageData?.weight : null,
        });
        setIsLoading(false);
        return {
          senderCity: {
            value: data?.fromCity?.id || '',
            fromCountry: data?.fromCity?.country,
            label:
              `${data?.fromCity?.nameRu}, ${data?.fromCountry?.nameRu}` || {},
          },
          receiverCity: {
            value: data?.toCity?.id || '',
            toCountry: data?.toCity?.country,
            label: `${data?.toCity?.nameRu}, ${data?.toCountry?.nameRu}` || {},
          },
          length: data?.length > 0 ? data?.length : '',
          width: data?.width > 0 ? data?.width : '',
          height: data?.height > 0 ? data?.height : '',
          trackNumbers: data?.trackNumbers,
          serviceName: data?.serviceName,
          comment: data?.comment,
        };
      } else {
        setOrder('error');
        setIsLoading(false);
      }
    },
  });

  const parcelSize = watch('parcelSize');
  const length = watch('length');
  const width = watch('width');
  const height = watch('height');
  const weight = watch('weight');

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed, so add 1
  const day = String(today.getDate()).padStart(2, '0');
  const todayDate = `${year}-${month}-${day}`;

  useEffect(() => {
    if (
      weight !== undefined &&
      height !== undefined &&
      width !== undefined &&
      length !== undefined
    ) {
      const parcelWeight = (width * length * height) / 5000;
      setScopeWeight(parcelWeight > weight ? parcelWeight : null);
    }
  }, [weight, height, width, length]);

  useEffect(() => {
    (async () => {
      const { success, data } = await fetchParcelCategories();
      if (success) {
        setParcelData(data);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      await fetchCosts(dispatch);
    })();
  }, [dispatch]);

  const onSubmitCalc = (data) => {
    const orderData = {};
    Object.assign(orderData, data);
    const parcelWeight = (data.width * data.length * data.height) / 5000;
    const scopeWeight =
      data.parcelSize.value === 'custom'
        ? parcelWeight > data.weight
          ? parcelWeight
          : Number(data.weight)
        : Number(data.parcelSize.weight);
    setParams({ ...orderData, scopeWeight, selectedTariff });
    setIsDisabled(false);
    const cityParcelCost = costs?.find(
      (cost) =>
        cost?.fromCity?.id === data?.senderCity?.value &&
        cost?.toCity?.id === data?.receiverCity?.value
    );
    if (cityParcelCost) {
      const costPerKg = cityParcelCost?.costPerKg;
      const costPerKgMy = cityParcelCost?.costPerKgMy;
      let parCost;
      if (data.parcelSize.value === 'custom') {
        const { width, length, height } = data;
        const parcelWeight = (width * length * height) / 5000;
        parCost =
          Math.max(parcelWeight, data.weight) *
          (selectedTariff === 1 ? costPerKg : costPerKgMy);
      } else if (data.parcelSize.value === 'measurement') {
        parCost = 0;
      } else {
        parCost =
          data.parcelSize.weight *
          (selectedTariff === 1 ? costPerKg : costPerKgMy);
      }
      setParcelCost(parCost?.toFixed(2));
    } else {
      alert('Цена доставки не указана! (из города / в город)');
    }
  };

  const onSubmitForm = async (data) => {
    setLoading(true);
    const serviceIds = services.map((service) => service.id);
    const requestData = {
      ...params,
      ...data,
      receiver: receiver,
      cost: parcelCost,
      extraServices: serviceIds,
    };
    const { success } = await updateApplications(requestData, userID, id);
    if (success) {
      setLoading(false);
      setModalOpen(true);
      setModalContent('successUpdateRequest');
    } else {
      setLoading(false);
      setModalOpen(true);
      setModalContent('errorRequest');
    }
  };

  return (
    <>
      <div className='py-20 content min-h-[720px]'>
        <h1 className='font-medium text-2xl pb-8 pt-3'>Редактировать</h1>
        {isLoading ? (
          <ContentLoading extraStyle={480} />
        ) : order === 'error' ? (
          <ErrorServer />
        ) : (
          <>
            <div className='flex items-center pb-5'>
              <span className='bg-black text-colYellow rounded-full min-w-[32px] h-8 flex justify-center items-center font-medium text-lg'>
                1
              </span>
              <h3 className='text-xl text-[#6747e5] font-medium ml-2'>
                Основные параметры
              </h3>
              <span
                onClick={() => setIsDisabled(true)}
                className='w-7 h-7 ml-3 flex justify-center items-center rounded-md border border-gray-500 opacity-70 cursor-pointer'
              >
                <img className='w-5' src={editIcon} alt='*' />
              </span>
            </div>
            <div
              className={`${!isDisabled && 'pointer-events-none opacity-40'}`}
            >
              <div className='md:ml-5 lg:ml-10'>
                <form>
                  <div className='grid ld:grid-cols-2 lg:grid-cols-3 gap-6'>
                    <div>
                      <p className='font-medium mb-2'>Город отправки</p>
                      <Controller
                        name='senderCity'
                        control={control}
                        rules={{ required: 'Поле обязательно к заполнению!' }}
                        render={({ field }) => (
                          <Select
                            value={field.value}
                            options={cities?.map((el) => ({
                              value: el.id,
                              label: `${el.nameRu}, ${el.country.nameRu}`,
                              fromCountry: el.country.id,
                              isDisabled:
                                selectedReceiverCity &&
                                el.id === selectedReceiverCity.value,
                            }))}
                            placeholder='Выберите город'
                            onChange={(selectedOption) => {
                              const modifiedOption = {
                                ...selectedOption,
                                fromCountry: selectedOption?.fromCountry,
                              };
                              field.onChange(modifiedOption);
                              setSelectedSenderCity(modifiedOption);
                            }}
                            menuPortalTarget={document.body}
                            styles={{
                              control: (provided, state) => ({
                                ...provided,
                                padding: '8px',
                                boxShadow: state.isFocused ? 0 : 0,
                                border: state.isFocused ? '1px solid #999' : '',
                                '&:hover': {
                                  border: state.isFocused
                                    ? '1px solid #999'
                                    : '',
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
                      {errors?.senderCity && (
                        <p className='text-red-500 mt-1 text-sm'>
                          {errors?.senderCity.message || 'Error!'}
                        </p>
                      )}
                    </div>
                    <div>
                      <p className='font-medium mb-2'>Город назначения</p>
                      <Controller
                        name='receiverCity'
                        control={control}
                        rules={{ required: 'Поле обязательно к заполнению!' }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            options={cities?.map((el) => ({
                              value: el.id,
                              label: `${el.nameRu}, ${el.country.nameRu}`,
                              toCountry: el.country.id,
                              isDisabled:
                                selectedSenderCity &&
                                el.id === selectedSenderCity.value,
                            }))}
                            placeholder='Выберите город'
                            onChange={(selectedOption) => {
                              field.onChange(selectedOption);
                              setSelectedReceiverCity(selectedOption);
                            }}
                            menuPortalTarget={document.body}
                            styles={{
                              control: (provided, state) => ({
                                ...provided,
                                padding: '8px',
                                boxShadow: state.isFocused ? 0 : 0,
                                border: state.isFocused ? '1px solid #999' : '',
                                '&:hover': {
                                  border: state.isFocused
                                    ? '1px solid #999'
                                    : '',
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
                      {errors?.receiverCity && (
                        <p className='text-red-500 mt-1 text-sm'>
                          {errors?.receiverCity.message || 'Error!'}
                        </p>
                      )}
                    </div>
                    <div>
                      <p className='font-medium lg:mb-2 ld:min-h-[40px] lg:min-h-[auto] flex items-end mb-3'>
                        Размер посылки
                      </p>
                      <Controller
                        name='parcelSize'
                        control={control}
                        rules={{ required: 'Поле обязательно к заполнению!' }}
                        defaultValue={isParcelSize}
                        render={({ field }) => (
                          <Select
                            {...field}
                            options={[
                              {
                                value: 'custom',
                                label: 'Точные',
                              },
                              {
                                value: 'measurement',
                                label: 'Измерить на складе',
                              },
                              ...(parcelData || []).map((el) => ({
                                value: el?.id,
                                label: `${el?.nameRu} (${el?.length}x${el?.width}x${el?.height} см)`,
                                weight: el?.weight,
                              })),
                            ]}
                            placeholder='Выберите размер'
                            isSearchable={false}
                            onChange={(selectedOption) => {
                              field.onChange(selectedOption);
                              setIsParcelSize(selectedOption);
                            }}
                            menuPortalTarget={document.body}
                            styles={{
                              control: (provided, state) => ({
                                ...provided,
                                padding: '8px',
                                boxShadow: state.isFocused ? 0 : 0,
                                border: state.isFocused ? '1px solid #999' : '',
                                '&:hover': {
                                  border: state.isFocused
                                    ? '1px solid #999'
                                    : '',
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
                      {errors?.parcelSize && (
                        <p className='text-red-500 mt-1 text-sm'>
                          {errors?.parcelSize.message || 'Error!'}
                        </p>
                      )}
                    </div>
                    {isParcelSize?.label === 'Точные' && (
                      <>
                        <div>
                          <div className='flex items-center'>
                            <p className='font-medium'>Габариты, см</p>
                            <div className='relative ml-2 group'>
                              <img
                                className='w-5 cursor-pointer'
                                src={info}
                                alt='*'
                              />
                              <div className='absolute w-64 sm:w-80 p-5 bg-white shadow-[0_8px_34px_#00000026] z-[9999] top-7 ld:top-5 -left-28 ss:-left-24 ld:-left-80 lg:left-5 hidden group-hover:block lg:rounded-2xl rounded-tl-none'>
                                <img
                                  className='w-4/6 mx-auto'
                                  src={boxSize}
                                  alt='*'
                                />
                                <p className='text-xs sm:text-sm'>
                                  Стоимость доставки рассчитывается по
                                  наибольшему весу -{' '}
                                  <strong>физическому</strong> или{' '}
                                  <strong>объёмному</strong>.
                                  <br />
                                  Физический вес - это масса груза за кг.
                                  <br />
                                  Объёмный вес - это место, занимаемое
                                  отправлением при перевозке, рассчитывается по
                                  формуле: длина * ширина * высота в см / 5000.
                                </p>
                              </div>
                            </div>
                          </div>
                          <p className='text-xs mb-3 font-light opacity-70'>
                            (длина, ширина, высота)
                          </p>
                          <div className='flex justify-between items-center'>
                            <input
                              className='w-full border border-colGray2 p-[14px] rounded-[4px] focus:border-black focus:outline-non'
                              placeholder='Длина'
                              type='number'
                              step='0.000001'
                              {...register('length', {
                                required: true,
                              })}
                            />
                            <span className='mx-2'>x</span>
                            <input
                              className='w-full border border-colGray2 p-[14px] rounded-[4px] focus:border-black focus:outline-none'
                              placeholder='Ширина'
                              type='number'
                              step='0.000001'
                              {...register('width', {
                                required: true,
                              })}
                            />
                            <span className='mx-2'>x</span>
                            <input
                              className='w-full border border-colGray2 p-[14px] rounded-[4px] focus:border-black focus:outline-none'
                              placeholder='Высота'
                              type='number'
                              step='0.000001'
                              {...register('height', {
                                required: true,
                              })}
                            />
                          </div>
                        </div>
                        <div>
                          <p className='font-medium mb-3 ld:min-h-[40px] flex items-end'>
                            Вес посылки, кг
                          </p>
                          <div className='flex justify-between items-center max-w-[140px]'>
                            <input
                              className='w-full border border-colGray2 p-[14px] rounded-[4px] focus:border-black focus:outline-none'
                              placeholder='Вес'
                              type='number'
                              step='0.000001'
                              defaultValue='0.1'
                              {...register('weight', {
                                required: true,
                              })}
                            />
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  <div className='md:flex justify-between items-end mt-5'>
                    {isParcelSize?.label === 'Точные' ? (
                      <div>
                        {scopeWeight !== null && (
                          <>
                            <p className='font-medium leading-4'>
                              Объёмный вес, кг
                            </p>
                            <p className='text-xs mt-1'>
                              Объёмный вес - рассчитывается по формуле: длина *
                              ширина * высота в см / 5000
                            </p>
                            <div className='border border-colGray2 p-[14px] rounded-[4px] w-max min-w-[110px] mb-3 mt-2'>
                              {scopeWeight.toFixed(2)}
                            </div>
                            <div className='flex items-start p-3 rounded-lg bg-orange-200 max-w-[362px] w-full'>
                              <img
                                className='mt-[2px]'
                                src={attention}
                                alt='*'
                              />
                              <div className='ml-2'>
                                <h5 className='text-red-500 font-medium text-sm'>
                                  Обратите внимание!
                                </h5>
                                <p className='text-xs'>
                                  По габаритам объёмный вес превышает
                                  физический, <br />
                                  поэтому услуги будут рассчитаны по объёмному
                                  весу.
                                </p>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    ) : (
                      parcelSize?.weight && (
                        <div>
                          <p className='font-medium leading-4'>Вес, кг</p>
                          <div className='border border-colGray2 p-[14px] rounded-[4px] w-max min-w-[110px] mb-3 mt-2'>
                            До {parcelSize?.weight} кг
                          </div>
                        </div>
                      )
                    )}
                  </div>
                  <p className='mb-3 mt-5 font-medium'>
                    Выберите тариф <span className='text-red-500'>*</span>
                  </p>
                  <div className='lg:max-w-[680px] grid ld:grid-cols-2 gap-6 md:gap-10 mt-5'>
                    {tariffsData.map((el) => (
                      <div
                        key={el.id}
                        className={`${
                          selectedTariff === el?.id
                            ? 'bg-black text-white'
                            : 'bg-white'
                        } p-5 rounded-xl shadow-[0px_10px_20px_0px_rgba(204,_204,_204,_0.40)]`}
                      >
                        <div className='flex justify-between items-start'>
                          <div className='flex items-center'>
                            {selectedTariff === el?.id ? (
                              <img
                                className='w-6 mr-2'
                                src={el?.statusWhiteImg}
                                alt='*'
                              />
                            ) : (
                              <img
                                className='w-6 mr-2'
                                src={el?.statusImg}
                                alt='*'
                              />
                            )}
                            <h3 className='font-medium text-lg'>{el?.name}</h3>
                          </div>
                          <span className='text-xs font-medium text-white bg-colPurple rounded-md px-3 py-[2px]'>
                            {el?.status}
                          </span>
                        </div>
                        <div className='py-2 text-2xl mm:text-3xl font-bold'>
                          {parcelCost ? parcelCost : order?.cost} $
                        </div>
                        <div className='py-5'>
                          <div className='flex items-center'>
                            <img className='w-5' src={receptionPoint} alt='*' />
                            <p className='text-sm font-medium pl-2'>
                              Пункт приёма GB
                            </p>
                          </div>
                          {selectedTariff === el?.id ? (
                            <img
                              src={el?.arrowWhiteImg}
                              alt='*'
                              className='my-2 ml-[2px]'
                            />
                          ) : (
                            <img
                              src={el?.arrowImg}
                              alt='*'
                              className='my-2 ml-[2px]'
                            />
                          )}
                          <div className='flex items-center'>
                            {selectedTariff === el?.id ? (
                              <img
                                className='w-5'
                                src={el?.locationWhiteImg}
                                alt='*'
                              />
                            ) : (
                              <img
                                className='w-5'
                                src={el?.locationImg}
                                alt='*'
                              />
                            )}
                            <p className='text-sm font-medium pl-2'>
                              {el?.deliveryPoint}
                            </p>
                          </div>
                        </div>
                        <p className='font-medium'>От 12 рабочих дней</p>
                        <div
                          onClick={() => {
                            setSelectedTariff(el?.id);
                          }}
                          className='rounded-md bg-colYellow p-2 w-full text-center text-black font-medium mt-5 cursor-pointer'
                        >
                          Выбрать
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className='py-5'>
                    <button
                      onClick={handleSubmit(onSubmitCalc)}
                      type='submit'
                      disabled={!selectedTariff}
                      className={`${
                        !selectedTariff
                          ? 'bg-[#D9D8D8] cursor-not-allowed'
                          : 'hover:opacity-80 text-white bg-black'
                      } font-medium p-3 ss:p-4 mm:p-3 flex justify-center items-center text-lg rounded-lg duration-150 mm:max-w-[280px] w-full mt-3 sm:mt-5`}
                    >
                      Рассчитать
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div
              className={`${isDisabled && 'pointer-events-none opacity-40'}`}
            >
              <div className='flex items-center pb-5 pt-8'>
                <span className='bg-black text-colYellow rounded-full min-w-[32px] h-8 flex justify-center items-center font-medium text-lg'>
                  2
                </span>
                <h3 className='text-xl text-[#6747e5] font-medium ml-2'>
                  Детали посылки
                </h3>
              </div>
              <div className='md:pl-5 lg:pl-10'>
                <div className='grid md:grid-cols-2 gap-6 max-w-[768px]'>
                  <div>
                    <p className='font-medium mb-2'>Трекинг номер</p>
                    <input
                      className='w-full border border-colGray2 p-4 rounded-lg focus:border-black focus:outline-none'
                      placeholder='Необязательно'
                      {...register('trackNumbers', {
                        required: false,
                      })}
                    />
                  </div>
                  <div>
                    <p className='font-medium mb-2'>
                      Дата прибытия вашей посылки в наш склад
                    </p>
                    <input
                      className='w-full border border-colGray2 p-4 rounded-lg focus:border-black focus:outline-none'
                      placeholder='Необязательно'
                      type='date'
                      defaultValue={todayDate}
                      {...register('dateArrival', {
                        required: 'Поле обязательно к заполнению!',
                      })}
                    />
                    {errors?.dateArrival && (
                      <p className='text-red-500 mt-1 text-sm'>
                        {errors?.dateArrival?.message ||
                          'Поле обязательно к заполнению!'}
                      </p>
                    )}
                  </div>
                  <div>
                    <p className='font-medium mb-2'>
                      Через какой сервис доставки будет доставлен ваш заказ на
                      наш склад?
                    </p>
                    <input
                      className='w-full border border-colGray2 p-4 rounded-lg focus:border-black focus:outline-none'
                      placeholder='Необязательно'
                      {...register('serviceName', {
                        required: false,
                      })}
                    />
                  </div>
                </div>
              </div>
              <div className='flex items-center pt-8'>
                <span className='bg-black text-colYellow rounded-full min-w-[32px] h-8 flex justify-center items-center font-medium text-lg'>
                  3
                </span>
                <h3 className='text-xl text-[#6747e5] font-medium ml-2'>
                  Данные получателя
                </h3>
              </div>
              <div className='flex items-center pl-10 pt-1 pb-5 relative'>
                <p className='text-sm text-gray-600 mr-2'>
                  Укажите данные получателя
                </p>
                <div className='group'>
                  <img
                    className='w-5 cursor-pointer group'
                    src={attention}
                    alt='*'
                  />
                  <div className='absolute w-72 p-4 bg-white shadow-[0_8px_34px_#00000026] z-[9999] top-10 left-5 hidden group-hover:block lg:rounded-2xl'>
                    <p className='text-xs sm:text-sm flex items-start'>
                      <img src={attention2} alt='*' />
                      <span className='ml-2'>
                        Выберите адрес и данные получателя из ваших сохраненных
                        адресов. Так же вы можете добавить новый адрес.
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className='md:pl-5 lg:pl-10'>
                {receiver && (
                  <div className='text-left h-max max-w-[340px] mb-5'>
                    <div className='flex flex-col space-y-2'>
                      <div>
                        <p className='text-xs opacity-50'>Имя получателя</p>
                        <h4 className='text-sm border-b-gray-300 border-b pb-1'>
                          {receiver?.receiverName || 'Не указана'}
                        </h4>
                      </div>
                      <div>
                        <p className='text-xs opacity-50'>Номер телефона</p>
                        <h4 className='text-sm border-b-gray-300 border-b pb-1'>
                          {receiver?.phone || 'Не указана'}
                        </h4>
                      </div>
                      <div>
                        <p className='text-xs opacity-50'>Тип адреса</p>
                        <h4 className='text-sm border-b-gray-300 border-b pb-1'>
                          {receiver?.type === 'custom'
                            ? 'Кастомный'
                            : receiver?.type === 'depot'
                            ? 'Пункт выдачи GivBox'
                            : '' || 'Не указана'}
                        </h4>
                      </div>
                      <div>
                        <p className='text-xs opacity-50'>Город, страна</p>
                        <h4 className='text-sm border-b-gray-300 border-b pb-1'>
                          {receiver?.city?.nameRu +
                            ', ' +
                            receiver?.country?.nameRu || 'Не указана'}
                        </h4>
                      </div>
                      <div>
                        <p className='text-xs opacity-50'>Адрес</p>
                        <h4 className='text-sm border-b-gray-300 border-b pb-1'>
                          {receiver?.address || 'Не указана'}
                        </h4>
                      </div>
                    </div>
                  </div>
                )}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setModalOpenAddress(true);
                    handleAddresses();
                  }}
                  className='bg-black sm:max-w-xs w-full p-3 h-[50px] text-white rounded-md hover:opacity-70 duration-150'
                >
                  {receiver ? 'Выбрать другой адрес' : '+ Выбрать адрес'}
                </button>
              </div>
              <div className='flex items-center pb-5 pt-8'>
                <span className='bg-black text-colYellow rounded-full min-w-[32px] h-8 flex justify-center items-center font-medium text-lg'>
                  4
                </span>
                <h3 className='text-xl text-[#6747e5] font-medium ml-2'>
                  Отправка
                </h3>
              </div>
              <div className='md:pl-5 lg:pl-10'>
                <p className='font-medium mb-3'>Дополнительные услуги</p>
                <button
                  onClick={() => {
                    setModalOpen(true);
                    setModalContent('extraServices');
                  }}
                  className='bg-black sm:max-w-xs w-full p-3 h-[50px] text-white rounded-md hover:opacity-70 duration-150 mb-5'
                >
                  + Выбрать услуги
                </button>
                {services &&
                  services?.map((el) => (
                    <div key={el?.id} className='py-2 max-w-xl mm:ml-5'>
                      <div className='flex justify-between shadow-[0_0_10px_#e5e3e3] py-2 px-3 rounded-lg'>
                        <div className='flex'>
                          <div className='w-5 mm:w-6 min-w-[20px] mm:min-w-[24px] h-5 mm:h-6 mr-2'>
                            <img src={el?.icon} alt='*' />
                          </div>
                          <div>
                            <h5 className='text-sm mm:text-base font-medium'>
                              {el?.nameRu}
                            </h5>
                            <p className='text-xs mm:text-sm opacity-60'>
                              {el?.infoRu || 'Описание'}
                            </p>
                          </div>
                        </div>
                        <div className='flex justify-end items-start'>
                          <span className='font-bold text-colPurple min-w-[44px] text-right'>
                            {el?.cost} $
                          </span>
                          <span
                            onClick={() => handleServicesDelete(el?.id)}
                            className='ml-3 text-xl text-red-500 cursor-pointer'
                          >
                            &times;
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                <div className='max-w-[768px] pt-5'>
                  <p className='font-medium mb-2'>
                    Дополнительная информация или комментарий
                  </p>
                  <textarea
                    className='w-full border border-colGray2 p-4 rounded-lg focus:border-black focus:outline-none resize-none'
                    placeholder='Комментарий'
                    {...register('comment', {
                      required: false,
                    })}
                  />
                </div>
              </div>
              <div className='md:flex justify-between items-center mt-5 mm:mt-12'>
                <div className='flex justify-end md:justify-start sm:max-w-[320px] font-medium w-full md:ml-0 ml-auto items-center p-5'>
                  <span className='text-lg'>Общая стоимость:</span>
                  <span className='text-xl mx-1 '>
                    {parcelCost ? parcelCost : order?.cost} $
                  </span>
                </div>
                <div className='flex justify-end items-center mt-8 md:mt-0 sm:max-w-[320px] w-full ml-auto'>
                  <button
                    type='submit'
                    disabled={!receiver}
                    onClick={handleSubmit(onSubmitForm)}
                    className={`${
                      !receiver
                        ? 'opacity-50 hover:opacity-50 cursor-not-allowed'
                        : 'hover:opacity-80'
                    } uppercase font-medium p-5 text-lg rounded-lg bg-black text-white duration-150 w-full`}
                  >
                    Оформить заявку
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <ModalAddress
        isOpen={modalOpenAddress}
        onClose={closeModalAddress}
        onReceiver={handleChooseAddress}
      />
      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        content={modalContent}
        handleServicesData={handleServicesData}
        services={services}
      />
      {loading ? <Loading /> : ''}
    </>
  );
};

export default ApplicationsUpdate;
