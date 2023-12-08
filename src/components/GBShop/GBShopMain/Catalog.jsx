import { NavLink } from 'react-router-dom';
import rightArrow from '../../../assets/gb-shop/icons/right.svg';
import { catalogs } from '../../../constants/gb-shop/catalog';

const Catalog = () => {
  const firstSevenCatalogs = catalogs.slice(0, 7);

  return (
    <>
      <div className='flex justify-between items-center bg-[#FBFBFB] py-2 px-5 my-7'>
        <h3 className='font-bold font-ubuntu text-[#030303] text-3xl'>
          Каталог
        </h3>
        <NavLink className='flex items-center justify-end' to='catalogues'>
          <span className='font-medium text-xl mr-2 text-[#FEDE2B]'>Все</span>
          <img src={rightArrow} alt='*' />
        </NavLink>
      </div>
      <div className='grid grid-cols-7 gap-7 pt-3'>
        {firstSevenCatalogs?.map((el) => (
          <NavLink
            to='categories'
            state={{ from: el?.name }}
            className='group'
            key={el?.id}
          >
            <div className='min-h-[140px] p-2 flex justify-center items-center shadow-md group-hover:shadow-xl duration-150 bg-[#FBFBFB] rounded-xl'>
              <img className='mx-auto' src={el?.image} alt='*' />
            </div>
            <p className='text-center text-xl font-medium pt-3'>{el?.name}</p>
          </NavLink>
        ))}
      </div>
    </>
  );
};

export default Catalog;
