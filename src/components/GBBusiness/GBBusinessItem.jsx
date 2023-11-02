import squire from '../../assets/images/squire.png';
import iconamoon from '../../assets/icons/iconamoon.svg';

const GBBusinessItem = () => {
  return (
    <>
      <div className='!bg-[#07AFE3] sm:min-h-[240px] px-4 md:px-0 relative py-8 sm:py-14'>
        <img src={squire} className='absolute top-0 right-0 z-[1]' alt='*' />
        <h3 className='text-xl mm:text-3xl text-white leading-snug max-w-3xl mx-auto z-[2] relative'>
          Уважаемые импортеры и экспортеры, наша команда поможет вам в решении
          задач по импорту/экспорту товаров из любых стран и континентов.{' '}
        </h3>
      </div>
      <div className='content py-8'>
        <h2 className='text-xl md:text-2xl font-medium my-3 text-center'>
          К Вашим услугам доставка любыми видами транспорта:
        </h2>
        <div className='grid md:grid-cols-2 gap-5 md:p-5'>
          <div className='flex items-start'>
            <img src={iconamoon} alt='*' />
            <p className='ml-2 sm:text-lg sm:leading-6'>
              Морские контейнерные перевозки в том числе доставка негабаритных
              грузов;
            </p>
          </div>
          <div className='flex items-start'>
            <img src={iconamoon} alt='*' />
            <p className='ml-2 sm:text-lg sm:leading-6'>Доставка автотранспортом;</p>
          </div>
          <div className='flex items-start'>
            <img src={iconamoon} alt='*' />
            <p className='ml-2 sm:text-lg sm:leading-6'>Доставка Ж/Д</p>
          </div>
          <div className='flex items-start'>
            <img src={iconamoon} alt='*' />
            <p className='ml-2 sm:text-lg sm:leading-6'>Авиа доставка</p>
          </div>
        </div>
        <h2 className='text-xl md:text-2xl font-medium mt-10 mb-3 text-center'>
          Для ваших задач мы предлагаем:
        </h2>
        <div className='grid mm:grid-cols-2 md:grid-cols-3 gap-5 md:p-5'>
          <div className='flex items-start'>
            <span className='min-w-[12px] h-3 mt-[5px] bg-[#07AFE3] rounded-full mr-2'></span>
            <p>
              Собственные Компании в США, Кыргызстане, Турции, Армении и ОАЭ
              позволяют поставлять товары всех направлений и категорий, кроме
              международно запрещенных.
            </p>
          </div>
          <div className='flex items-start'>
            <span className='min-w-[12px] h-3 mt-[5px] bg-[#07AFE3] rounded-full mr-2'></span>
            <p>
              Собственные склады в США (безналоговый штат Дэлавер) , Европе
              (Германия) , Турции, Китае, Великобритании, ОАЭ.
            </p>
          </div>
          <div className='flex items-start'>
            <span className='min-w-[12px] h-3 mt-[5px] bg-[#07AFE3] rounded-full mr-2'></span>
            <p>Транзит через Киргизию и Турцию товаров из США и ЕС.</p>
          </div>
          <div className='flex items-start'>
            <span className='min-w-[12px] h-3 mt-[5px] bg-[#07AFE3] rounded-full mr-2'></span>
            <p>
              Авиадоставка товаров и посылок из США и ЕС , быстро (3 недели)
              через Бишкек для физических лиц, с возможность выкупа с eBay,
              Amozon и любых других магазинах и маркетплесах
            </p>
          </div>
          <div className='flex items-start'>
            <span className='min-w-[12px] h-3 mt-[5px] bg-[#07AFE3] rounded-full mr-2'></span>
            <p>
              Осуществим платежи по инвойсам и контрактам в любой валюте , для
              приема средств от вас ООО(НДС) и ИП (без НДС) , карты РФ различных
              банков и USDT
            </p>
          </div>
          <div className='flex items-start'>
            <span className='min-w-[12px] h-3 mt-[5px] bg-[#07AFE3] rounded-full mr-2'></span>
            <p>
              Осуществим Экспорт ваших товаров из России в любые недружественные
              страны.
            </p>
          </div>
        </div>
        <div className='w-full mt-8 sm:max-w-md bg-[#FFA629] text-center mx-auto rounded-lg p-6 text-white'>
          Для консультации по вашим грузам просим связываться с нашими
          менеджерами любым удобным для Вас способом, мы оперативно отметим и
          сделаем все необходимые расчеты.
        </div>
      </div>
    </>
  );
};

export default GBBusinessItem;
