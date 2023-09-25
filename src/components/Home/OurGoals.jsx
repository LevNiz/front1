import vector from './../../assets/images/vector3.png';
import goalsImg from './../../assets/images/goals1.jpg';

const OurGoals = () => {
  return (
    <div className='pt-20 pb-20 lg:pb-40 content'>
      <div className='flex justify-center mb-5'>
        <div className="flex relative bg-[#E8E8E8] w-max pr-2 rounded-sm">
          <span className='absolute w-1 h-full bg-colYellow'></span>
          <h6 className='ml-3'>Цели, миссии, задачи компании</h6>
        </div>
      </div>
      <h1 className='text-3xl sm:text-[40px] font-medium text-center'>
        Наши цели
      </h1>
      <h4 className='text-xl sm:text-2xl font-medium text-center mt-3 mb-10'>
        Наши цели, миссии, ценности
      </h4>
      <div className='lg:flex pt-8'>
        <div className='lg:w-2/5 relative pl-10 xl2:pl-0'>
          <img
            src={vector}
            className='absolute xl2:top-[-50px] -top-[40px] left-0 xl2:left-[-50px]'
            alt='*'
          />
          <h3 className='text-xl font-bold mb-3'>Наши ценности</h3>
          <ul>
            <li className='xl:text-lg font-medium mb-2'>
              <span className='font-bold'>1.</span> Каждая посылка это отдельный
              человек с его историей, судьбой и важным событием , именно это
              определяет все наши действия.
            </li>
            <li className='xl:text-lg font-medium mb-2'>
              <span className='font-bold'>2.</span> Ответственность за каждое
              слово и каждое действие для этого мы готовы делать больше и
              находить нестандартные решения.
            </li>
            <li className='xl:text-lg font-medium mb-2'>
              <span className='font-bold'>3.</span> GivBox - это большая
              команда, которая любит свою работу и делает ее хорошо. Мы всегда
              готовы помочь и поддержать друг друга. От действий каждого из нас
              зависит результат.
            </li>
            <li className='xl:text-lg font-medium mb-2'>
              <span className='font-bold'>4.</span> Открытость и высокая
              клиентоориентированность делает нашу работу прозрачной и честной,
              мы с радостью поделимся нашими достижениями и честно скажем об
              ошибках.
            </li>
            <li className='xl:text-lg font-medium mb-2'>
              <span className='font-bold'>5.</span> Становиться лучше и внедрять
              новые технологии , каждый день мы получаем опыт и стараемся
              усовершенствовать все наши инструменты и сервисы
            </li>
          </ul>
        </div>
        <div className='mt-10 lg:mt-0 lg:w-3/5 relative'>
          <div className='shadow-[rgba(204,_204,_204,_0.40)_0px_10px_20px_0px] mb-4 lg:mb-12 mm:ml-5 xl:ml-24 p-4 mm:max-w-[268px]'>
            <h4 className='text-xl font-bold text-colPurple'>Наша миссия</h4>
            <p className='mt-2 font-medium'>
              Мы хотим объединять людей, делать их жизнь лучше и стараемся
              делать это благодаря нашей бескомпромиссной
              клиентоориентированности и предоставлению услуг высочайшего
              качества изо дня в день!
            </p>
          </div>
          <div className='mm:max-w-[254px] mm:absolute min-h-[200px] mm:min-h-[350px] text-2xl mm:text-3xl top-0 right-0 p-6 text-white bg-[linear-gradient(180deg,_#9747FF_0%,_rgba(151,_71,_255,_0.00)_100%)]'>
            Цель нашей работы - доверие и хорошее настроение наших клиентов.
          </div>
          <div className='max-w-[576px] md:min-w-[470px] max-h-[230px] ml-auto lg:mx-auto -mt-6 sm:pt-4 overflow-hidden'>
            <img
              className='w-full h-full object-cover'
              src={goalsImg}
              alt='*'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurGoals;
