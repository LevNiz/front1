import nounFranchise from '../../assets/icons/noun-franchise.svg';
import vectorFranchise from '../../assets/icons/franchiseVector.svg';

const GBFranchiseItem = () => {
  return (
    <div className='pt-5'>
      <h3 className='text-xl mm:text-2xl py-5 text-center italic'>
        Сервис GB-Franchise - это уникальная возможность зарабатывать и
        развиваться с международной компанией GivBox
      </h3>
      <div className='py-5'>
        <h2 className='text-2xl sm:text-3xl font-medium medium mt-3 mb-5'>
          Начните зарабатывать на международной доставке и продаже брендовых
          товаров.
        </h2>
        <h3 className='text-xl sm:text-2xl font-medium mb-4'>
          GB-Franchise это:
        </h3>
        <div className='flex flex-col space-y-4'>
          <div className='flex items-center'>
            <img src={nounFranchise} alt='*' />
            <p className='ml-2 sm:text-lg sm:leading-6'>Доходы с первого дня</p>
          </div>
          <div className='flex items-center'>
            <img src={nounFranchise} alt='*' />
            <p className='ml-2 sm:text-lg sm:leading-6'>Бесплатное обучение</p>
          </div>
          <div className='flex items-center'>
            <img src={nounFranchise} alt='*' />
            <p className='ml-2 sm:text-lg sm:leading-6'>
              Лучшая маркетинговая и IT поддержка на рынке
            </p>
          </div>
          <div className='flex items-center'>
            <img src={nounFranchise} alt='*' />
            <p className='ml-2 sm:text-lg sm:leading-6'>
              Готовые и проверенные маршруты и тарифы по доставке всех брендовых
              товаров со всего мира
            </p>
          </div>
          <div className='flex items-center'>
            <img src={nounFranchise} alt='*' />
            <p className='ml-2 sm:text-lg sm:leading-6'>
              Открытие своего магазина в GB-Shop
            </p>
          </div>
          <div className='flex items-center'>
            <img src={nounFranchise} alt='*' />
            <p className='ml-2 sm:text-lg sm:leading-6'>
              Лучшие условия для продвижение собственных товаров и бренда
            </p>
          </div>
        </div>
        <h1 className='text-2xl sm:text-3xl pt-14 text-center max-w-5xl mx-auto font-medium'>
          Откройте свой пункт выдачи и продажи брендовых товаров со всего мира в
          своем городе вместе с нами и твой бизнес будет рости с первого дня!
        </h1>
        <h2 className='text-xl md:text-2xl font-medium mt-10 mb-5'>
          Вашими клиентами станут:
        </h2>
        <div className='flex flex-col space-y-5'>
          <div className='flex items-center'>
            <img className='w-5 sm:w-auto' src={vectorFranchise} alt='*' />
            <p className='ml-4 sm:text-lg sm:leading-6'>Интернет магазины</p>
          </div>
          <div className='flex items-center'>
            <img className='w-5 sm:w-auto' src={vectorFranchise} alt='*' />
            <p className='ml-4 sm:text-lg sm:leading-6'>Физические лица</p>
          </div>
          <div className='flex items-center'>
            <img className='w-5 sm:w-auto' src={vectorFranchise} alt='*' />
            <p className='ml-4 sm:text-lg sm:leading-6'>Юридические лица</p>
          </div>
          <div className='flex items-center'>
            <img className='w-5 sm:w-auto' src={vectorFranchise} alt='*' />
            <p className='ml-4 sm:text-lg sm:leading-6'>
              Производители собственных брендовых товаров
            </p>
          </div>
          <div className='flex items-center'>
            <img className='w-5 sm:w-auto' src={vectorFranchise} alt='*' />
            <p className='ml-4 sm:text-lg sm:leading-6'>
              Частные продавцы в интернете
            </p>
          </div>
          <div className='flex items-center'>
            <img className='w-5 sm:w-auto' src={vectorFranchise} alt='*' />
            <p className='ml-4 sm:text-lg sm:leading-6'>
              Мастерские брендовых изделий ручной работы
            </p>
          </div>
        </div>
        <div className='w-full mt-14 max-w-3xl text-center mx-auto'>
          <h1 className='text-xl italic pt-14 pb-10'>
            Мы предлагаем вам готовую идею, а идея - это самый дорогой товар в
            мире!
          </h1>
          <h4 className='max-w-[280px] w-full min-h-[60px] mx-auto mt-8 rounded-md font-medium text-2xl flex justify-center items-center bg-colYellow'>
            Хочу франшизу
          </h4>
        </div>
      </div>
    </div>
  );
};

export default GBFranchiseItem;
