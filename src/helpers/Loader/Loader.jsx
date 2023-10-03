import Loader from 'react-js-loader';

export const Loading = () => {
  return (
    <div className='App fixed w-full h-full top-0 left-0 z-[99999] bg-black bg-opacity-30'>
      <div className='flex justify-center items-center h-full'>
        <div className={'item'}>
          <Loader
            type='bubble-loop'
            bgColor={'#FFFFFF'}
            color={'#FFFFFF'}
            size={100}
          />
        </div>
      </div>
    </div>
  );
};

export const ContentLoading = ({ extraStyle }) => {
  return (
    <div style={{ height: extraStyle }} className={`w-full py-5`}>
      <div className='flex justify-center items-center w-full h-full'>
        <div className={'item'}>
          <Loader
            type='bubble-loop'
            bgColor={'#FEDE2B'}
            color={'#000'}
            size={100}
          />
        </div>
      </div>
    </div>
  );
};

export const ButtonLoading = () => {
  return (
    <div>
      <Loader type='bubble-loop' bgColor={'#fff'} color={'#000'} size={50} />
    </div>
  );
};
