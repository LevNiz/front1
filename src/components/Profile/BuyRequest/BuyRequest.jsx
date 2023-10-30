import BuyRequestItem from "./BuyRequestItem";

const BuyRequest = () => {
  return (
    <div className='w-full md:p-4'>
      <div className='flex justify-between items-center'>
        <h3 className='text-xl'>Заявка на покупку</h3>
        <button
          //   onClick={() => navigate('new')}
          className='bg-colYellow py-2 ss:py-[10px] px-3 sm:px-5 font-medium rounded-md hover:opacity-70 duration-100 text-xs sm:text-sm'
        >
          Новый заказ
        </button>
      </div>
      <BuyRequestItem />
    </div>
  );
};

export default BuyRequest;
