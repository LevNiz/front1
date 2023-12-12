import emptyImg from '../../assets/images/404.svg';

export const ErrorEmpty = ({ title, desc }) => {
  return (
    <div className='min-h-[400px] flex items-center'>
      <div className='text-center max-w-sm mx-auto w-full'>
        <img className='mx-auto w-60 -mb-5' src={emptyImg} alt='*' />
        <h4 className='text-center font-medium text-xl'>{title}</h4>
        <p className='text-gray-400'>{desc}</p>
      </div>
    </div>
  );
};
