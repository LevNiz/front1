import { NavLink } from 'react-router-dom';
import android from '../../assets/images/android.png';
import tempImgBg from '../../assets/images/temp-modal-bg.jpg';
import googlePlay from '../../assets/images/google-play2.svg';

const TempModal = ({ setIsTempNodal }) => {
  return (
    <div
      style={{ backgroundImage: `url(${tempImgBg})` }}
      className='fixed bottom-2 left-2 bg-no-repeat bg-center bg-cover md:max-w-[520px] p-5 md:h-[300px] rounded-3xl w-[96%] md:w-full z-[99999] flex justify-center items-center'
    >
      <span
        onClick={() => {
          setIsTempNodal(true);
          localStorage.setItem('tempModal', true);
        }}
        className='absolute top-3 right-5 text-4xl cursor-pointer'
      >
        &times;
      </span>
      <div className='hidden md:block py-3'>
        <img className='w-5/6 mx-auto' src={android} alt='*' />
      </div>
      <div className='md:w-5/6'>
        <h3 className='text-lg ss:text-2xl font-medium text-center pt-7 pb-5'>
          Наше приложение теперь
          <br />
          доступно в Google Play
        </h3>
        <NavLink
          to='https://play.google.com/store/apps/details?id=kg.kyrgyzcoder.givboxkg'
          target='_blank'
        >
          <img className='mx-auto' src={googlePlay} alt='*' />
        </NavLink>
      </div>
    </div>
  );
};

export default TempModal;
