import squire from '../../assets/images/squareFranchise.png';
import nounFranchise from '../../assets/icons/noun-franchise.svg';
import vectorFranchise from '../../assets/icons/franchiseVector.svg';

const GBFranchiseItem = () => {
  return (
    <div className='mm:content pt-8 mm:pt-12'>
      <div className='!bg-[#D660F2] px-4 md:px-6 py-8 sm:py-10 relative'>
        <img src={squire} className='absolute top-0 right-0 z-[1]' alt='*' />
        <h3 className='text-xl mm:text-2xl text-white leading-snug max-w-5xl z-[2] relative'>
          Уважаемые импортеры и экспортеры, наша команда поможет вам в решении
          задач по импорту/экспорту товаров из любых стран и континентов.{' '}
        </h3>
      </div>
      <div className='content py-8'>
        <h2 className='text-xl md:text-2xl font-medium medium mt-3 mb-5'>
          Начните зарабатывать на международной доставке и продаже брендовых
          товаров.
        </h2>
        <h3 className='text-xl font-medium mb-4'>GB-Franchise это:</h3>
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
        <h1 className='text-2xl sm:text-3xl pt-14 text-center max-w-5xl mx-auto'>
          Откройте свой пункт выдачи и продажи брендовых товаров со всего мира в
          своем городе вместе с нами и твой бизнес будет рости с первого дня!
        </h1>
        <h2 className='text-xl md:text-2xl font-medium mt-10 mb-3'>
          Вашими клиентами станут:
        </h2>
        <div className='flex flex-col space-y-4'>
          <div className='flex items-center'>
            <img className='w-5 sm:w-auto' src={vectorFranchise} alt='*' />
            <p className='ml-2 sm:text-lg sm:leading-6'>Интернет магазины</p>
          </div>
          <div className='flex items-center'>
            <img className='w-5 sm:w-auto' src={vectorFranchise} alt='*' />
            <p className='ml-2 sm:text-lg sm:leading-6'>Физические лица</p>
          </div>
          <div className='flex items-center'>
            <img className='w-5 sm:w-auto' src={vectorFranchise} alt='*' />
            <p className='ml-2 sm:text-lg sm:leading-6'>Юридические лица</p>
          </div>
          <div className='flex items-center'>
            <img className='w-5 sm:w-auto' src={vectorFranchise} alt='*' />
            <p className='ml-2 sm:text-lg sm:leading-6'>
              Производители собственных брендовых товаров
            </p>
          </div>
          <div className='flex items-center'>
            <img className='w-5 sm:w-auto' src={vectorFranchise} alt='*' />
            <p className='ml-2 sm:text-lg sm:leading-6'>
              Частные продавцы в интернете
            </p>
          </div>
          <div className='flex items-center'>
            <img className='w-5 sm:w-auto' src={vectorFranchise} alt='*' />
            <p className='ml-2 sm:text-lg sm:leading-6'>
              Мастерские брендовых изделий ручной работы
            </p>
          </div>
        </div>
        <div className='w-full mt-14 max-w-3xl text-center mx-auto'>
          <h1 className='text-2xl sm:text-3xl text-[#D660F2] font-medium italic'>
            Мы предлагаем вам готовую идею, а идея - это самый дорогой товар в
            мире!
          </h1>
          <h4 className='max-w-[280px] w-full min-h-[60px] mx-auto mt-8 rounded-md text-white font-medium text-3xl flex justify-center items-center bg-alaket'>
            Хочу франшизу
          </h4>
        </div>
      </div>
    </div>
  );
};

export default GBFranchiseItem;
