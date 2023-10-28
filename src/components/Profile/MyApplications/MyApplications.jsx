import { useState } from 'react';
import ActiveApplications from './ActiveApplications';
import ArchiveApplications from './ArchiveApplications';

const MyApplications = () => {
  const [activeBtn, setActiveBtn] = useState('active');

  const handleButtonClick = (buttonName) => {
    setActiveBtn(buttonName);
  };

  return (
    <div className='md:p-4 w-full'>
      <div className='flex items-center pt-5 md:pt-0'>
        <button
          onClick={() => handleButtonClick('active')}
          className={`${
            activeBtn === 'active' ? 'bg-colYellow border-colYellow' : ''
          } px-4 py-2 border max-w-[200px] w-full rounded-md rounded-tr-none rounded-br-none`}
        >
          Активные
        </button>
        <button
          onClick={() => handleButtonClick('archive')}
          className={`${
            activeBtn === 'archive' ? 'bg-colYellow border-colYellow' : ''
          } px-4 py-2 border max-w-[200px] w-full rounded-md rounded-tl-none rounded-bl-none`}
        >
          Архив
        </button>
      </div>
      {activeBtn === 'active' ? (
        <ActiveApplications />
      ) : (
        <ArchiveApplications />
      )}
    </div>
  );
};

export default MyApplications;
