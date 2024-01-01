import { useSelector } from 'react-redux';
import { ContentLoading } from '../../../helpers/Loader/Loader';
import { ErrorServer } from '../../../helpers/Errors/ErrorServer';
import { ErrorEmpty } from '../../../helpers/Errors/ErrorEmpty';

const Brands = () => {
  const { stores, loading, error } = useSelector((state) => state?.stores);

  return (
    <div className='py-10 content'>
      <div className='flex justify-between items-center bg-[#FBFBFB] py-1 lg:py-2 px-3 lg:px-5 mt-7 mb-12'>
        <h3 className='font-bold font-ubuntu text-[#030303] text-xl md:text-2xl lg:text-3xl'>
          Бренды
        </h3>
      </div>
      {loading ? (
        <ContentLoading extraStyle={240} />
      ) : error ? (
        <ErrorServer />
      ) : stores?.length ? (
        <div className='grid grid-cols-2 ld:grid-cols-3 xl:grid-cols-5 gap-5 shadow-[0_0_28px_#edebeb] rounded-lg p-5'>
          {stores?.map((el) => (
            <div
              className='w-32 mm:w-40 h-[70px] sm:h-[90px] xl:h-[200px] mx-auto'
              key={el?.id}
            >
              <img
                className='w-full h-full object-contain'
                src={el?.avatar}
                alt='*'
              />
            </div>
          ))}
        </div>
      ) : (
        <ErrorEmpty />
      )}
    </div>
  );
};

export default Brands;
