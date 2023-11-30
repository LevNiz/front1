import rightArrow from '../../assets/icons/double-right.svg';
import leftArrow from '../../assets/icons/double-left.svg';

const Pagination = ({
  count,
  page,
  handlePagination,
  handleNextPagination,
  handlePrevPagination,
}) => {
  const totalPages = Math.ceil(count / 20);
  const isOnFirstPage = page === 1;
  const isOnLastPage = page === totalPages;

  return (
    <div className='pt-10 pb-5'>
      <ul className='flex justify-center items-center space-x-3'>
        <li
          onClick={() => !isOnFirstPage && handlePrevPagination()}
          className={`${
            isOnFirstPage ? 'opacity-40 cursor-auto' : ''
          } bg-colYellow h-[32px] w-[33px] flex justify-center items-center font-medium rounded-md cursor-pointer`}
        >
          <img className='w-3' src={leftArrow} alt='*' />
        </li>
        {Array.from({ length: totalPages }, (_, index) => (
          <li
            key={index + 1}
            className={`${
              page === index + 1 ? 'bg-black text-white' : 'bg-colYellow'
            } py-1 px-3 font-medium rounded-md cursor-pointer`}
            onClick={() => handlePagination(index + 1)}
          >
            {index + 1}
          </li>
        ))}
        <li
          onClick={() => !isOnLastPage && handleNextPagination()}
          className={`${
            isOnLastPage ? 'opacity-40 cursor-auto' : ''
          } bg-colYellow h-[32px] w-[33px] flex justify-center items-center font-medium rounded-md cursor-pointer`}
        >
          <img className='w-3' src={rightArrow} alt='*' />
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
