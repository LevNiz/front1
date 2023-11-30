import rightArrow from '../../assets/icons/double-right.svg';
import leftArrow from '../../assets/icons/double-left.svg';

const Pagination = ({ count, page, handlePagination }) => {
  const totalPages = Math.ceil(count / 20);
  const handleClickPagination = (index) => {
    handlePagination(index);
  };

  return (
    <div className='pt-10 pb-5'>
      <ul className='flex justify-center items-center space-x-3'>
        <li className='bg-colYellow h-[32px] w-[33px] flex justify-center items-center font-medium rounded-md cursor-pointer'>
          <img className='w-3' src={leftArrow} alt='*' />
        </li>
        {Array.from({ length: totalPages }, (_, index) => (
          <li
            key={index + 1}
            className={`${
              page === index + 1 ? 'bg-black text-white' : 'bg-colYellow'
            } py-1 px-3 font-medium rounded-md cursor-pointer`}
            onClick={() => handleClickPagination(index + 1)}
          >
            {index + 1}
          </li>
        ))}
        <li className='bg-colYellow h-[32px] w-[33px] flex justify-center items-center font-medium rounded-md cursor-pointer'>
          <img className='w-3' src={rightArrow} alt='*' />
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
