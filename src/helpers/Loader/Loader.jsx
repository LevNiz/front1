import Loader from 'react-js-loader';

const Loading = () => {
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

export default Loading;
