import emptyImg from '../../assets/images/404.svg';

export const ErrorEmpty = ({ title, desc }) => {
  return (
    <div className='flex flex-col justify-center items-center min-h-[400px]'>
      <div className='text-center max-w-xs w-full'>
        <img className='mx-auto' src={emptyImg} alt='*' />
        <h4 className='text-center font-medium mt-5 text-xl'>{title}</h4>
        <p className='text-gray-400'>{desc}</p>
      </div>
    </div>
  );
};
