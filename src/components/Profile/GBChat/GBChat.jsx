import GBChatItem from './GBChatItem';
import serachIcon from '../../../assets/icons/search.svg';
import welcomeImg from '../../../assets/images/welcome-chat.png';

const GBChat = () => {
  return (
    <div className='flex items-center w-full md:p-4 pt-5'>
      <div className='w-full ld:w-3/5 md:w-full lg:w-2/4 h-full'>
        <form className='mb-5'>
          <div className='flex border border-colGray rounded-md p-1 w-full relative'>
            <input
              className='pl-2 pr-8 py-1 w-full focus:outline-none'
              placeholder='Поиск...'
              type='text'
            />
            <img
              className='w-5 opacity-70 cursor-pointer absolute top-1/2 -translate-y-1/2 right-2'
              src={serachIcon}
              alt='*'
            />
          </div>
        </form>
        <GBChatItem />
      </div>
      <div className='ld:2/5 lg:w-2/4 p-3 hidden ld:block md:p-8 md:hidden lg:block'>
        <img src={welcomeImg} alt='*' />
      </div>
    </div>
  );
};

export default GBChat;
