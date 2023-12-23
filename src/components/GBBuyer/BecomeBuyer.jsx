import ReactPlayer from 'react-player';
import box from '../../assets/icons/noun-box.svg';
import map from '../../assets/icons/new-country.svg';
import time from '../../assets/icons/timeSvg.svg';
import money from '../../assets/icons/dollarAlaket.svg';

const BecomeBuyer = () => {
  return (
    <div className='content py-20 min-h-[768px]'>
      <h1 className='text-xl py-3 mm:text-3xl font-bold'>Стать Buyer ом</h1>
      <div className='flex pt-5'>
        <div className='w-2/5'>
          <div className='h-72 rounded-lg overflow-hidden'>
            <ReactPlayer
              controls
              playing
              className='react-player'
              url='https://www.youtube.com/watch?v=lX0MDrQpwbg'
              width='100%'
              height='100%'
            />
          </div>
        </div>
        <div className='w-3/5 pl-8'>
          <h3 className='text-lg max-w-[470px]'>
            Присоединяйтесь к GivBox и станьте байером для удобных и надежных
            доставок!
          </h3>
          <h3 className='text-xl font-medium py-3'>
            Вы готовы к уникальному опыту доставок? Приглашаем вас стать частью
            нашей платформы и начать удовольствие от мгновенных и беззаботных
            перевозок.
          </h3>
          <h3 className='text-base p-4 bg-gray-100 rounded-md'>
            🌎 GivBox - это не просто платформа для доставки, это место, где
            каждая ваша доставка имеет большой смысл. Мы поднимаем барьеры и
            создаем инновационное пространство, где байеры могут наслаждаться
            удобством и одновременно вносить вклад в социальную и экологическую
            устойчивость.
          </h3>
        </div>
      </div>
      <h2 className='text-2xl font-semibold pt-12 pb-5 mm:px-3'>
        Что вы получаете, став байером GivBox?
      </h2>
      <div className='shadow-[0px_10px_20px_2px_rgba(204,_204,_204,_0.40)] p-7'>
        <ul className='space-y-3'>
          <li className='flex items-center'>
            <img className='w-5' src={time} alt='*' />
            <span className='pl-2'>
              Моментальный доступ к удобным и надежным доставкам.
            </span>
          </li>
          <li className='flex items-center'>
            <img className='w-5' src={map} alt='*' />
            <span className='pl-2'>
              Возможность поддержать местные и экологичные варианты доставки.
            </span>
          </li>
          <li className='flex items-center'>
            <img className='w-5' src={money} alt='*' />
            <span className='pl-2'>
              Участие в программе лояльности с бонусами и скидками.
            </span>
          </li>
          <li className='flex items-center'>
            <img className='w-5' src={box} alt='*' />
            <span className='pl-2'>
              Удовлетворение от знания, что вы вносите вклад в облегчение жизни
              многих людей.
            </span>
          </li>
        </ul>
      </div>
      <div className='bg-colYellow p-5 max-w-xl mt-10 mx-auto rounded-lg'>
        Присоединяйтесь к <strong>GivBox</strong> уже сегодня и станьте частью
        движения, меняюшего мир одной доставкой за раз. Поднимите стандарты
        доставки и создайте лучшее будущее для себя и для общества!
      </div>
    </div>
  );
};

export default BecomeBuyer;
