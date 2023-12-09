import iconamoon from '../../assets/icons/iconamoon.svg';

const GBBusinessItem = () => {
  return (
    <div className='content pt-5'>
      <h3 className='text-xl mm:text-2xl text-center italic py-5 text-[#020105]'>
        Уважаемые импортеры и экспортеры, наша команда поможет вам в решении
        задач по импорту/экспорту товаров из любых стран и континентов.{' '}
      </h3>
      <div className='content py-5'>
        <h2 className='text-xl md:text-2xl font-medium mt-3 mb-5'>
          К Вашим услугам доставка любыми видами транспорта:
        </h2>
        <div className='flex flex-col space-y-4'>
          <div className='flex items-start'>
            <img src={iconamoon} alt='*' />
            <p className='ml-2 sm:text-lg sm:leading-6'>
              Морские контейнерные перевозки в том числе доставка негабаритных
              грузов;
            </p>
          </div>
          <div className='flex items-start'>
            <img src={iconamoon} alt='*' />
            <p className='ml-2 sm:text-lg sm:leading-6'>
              Доставка автотранспортом;
            </p>
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
        <h2 className='text-xl md:text-2xl font-medium mt-10 mb-3'>
          Для ваших задач мы предлагаем:
        </h2>
        <div className='flex flex-col space-y-3 max-w-5xl'>
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
        <div className='w-full mt-16 text-lg sm:text-xl text-center mx-auto rounded-lg py-5'>
          Для консультации по вашим грузам просим связываться с нашими
          менеджерами любым удобным для Вас способом, мы оперативно отметим и
          сделаем все необходимые расчеты.
        </div>
      </div>
    </div>
  );
};

export default GBBusinessItem;
