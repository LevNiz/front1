import goalsImg from './../../assets/images/goals1.jpg';

const OurGoals = () => {
  return (
    <div className='pt-20 pb-20 lg:pb-24 content'>
      <div className='flex justify-center mb-5'>
        <div className="flex relative bg-[#E8E8E8] w-max pr-2 rounded-sm">
          <span className='absolute w-1 h-full bg-colYellow'></span>
          <h6 className='ml-3'>Цели, миссии, задачи компании</h6>
        </div>
      </div>
      <h1 className='text-3xl sm:text-[40px] font-medium text-center'>
        Наши цели
      </h1>
      <div className='lg:flex pt-20'>
        <div className='lg:w-2/5 relative lg:pl-10 xl2:pl-0'>
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
          <div className='shadow-[rgba(204,_204,_204,_0.40)_0px_10px_20px_0px] mb-4 lg:mb-12 mm:ml-5 xl:ml-24 p-4 mm:max-w-[280px]'>
            <h4 className='text-lg font-bold'>Наша миссия</h4>
            <p className='mt-2 text-sm'>
              Мы хотим объединять людей, делать их жизнь лучше и стараемся
              делать это благодаря нашей бескомпромиссной
              клиентоориентированности и предоставлению услуг высочайшего
              качества изо дня в день!
            </p>
          </div>
          <div className='absolute lg:-top-8 mm:top-0 ss:top-52 top-60 right-5 bg-colYellow w-[135px] h-48 lg:h-[277px]'></div>
          <div className='lg:max-w-[230px] max-w-[190px] absolute top-[17rem] ss:top-60 mm:top-8 lg:top-0 right-14 text-xl mm:text-2xl lg:text-3xl p-6 text-white bg-[#020105]'>
            Цель нашей работы - доверие и хорошее настроение наших клиентов.
          </div>
          <div className='mm:max-w-[576px] min-h-[230px] pt-80 mm:pt-0 ml-auto lg:mx-auto overflow-hidden'>
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
