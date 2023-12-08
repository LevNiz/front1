import { NavLink } from 'react-router-dom';
import { catalogs } from '../../../constants/gb-shop/catalog';

const Catalogues = () => {
  return (
    <div className='py-24 content min-h-[991px]'>
      <div className='flex justify-between items-center bg-[#FBFBFB] py-2 px-5 my-7'>
        <h3 className='font-bold font-ubuntu text-[#030303] text-3xl'>
          Каталог
        </h3>
      </div>
      <div className='grid grid-cols-7 gap-7 pt-3'>
        {catalogs?.map((el) => (
          <NavLink
            to={{ pathname: '/categories', state: el?.name }}
            key={el?.id}
            className='group'
          >
            <div className='min-h-[140px] p-2 flex justify-center items-center shadow-md group-hover:shadow-xl duration-150 bg-[#FBFBFB] rounded-xl'>
              <img className='mx-auto' src={el?.image} alt='*' />
            </div>
            <p className='text-center text-xl font-medium pt-3'>{el?.name}</p>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Catalogues;
