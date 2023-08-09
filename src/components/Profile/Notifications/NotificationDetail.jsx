const NotificationDetail = () => {
  return (
    <>
      <div className='bg-colBgGray rounded-[18px] p-12'>
        <h3 className='text-xl font-bold pb-2 break-all'>
          Вы получили сообщение
        </h3>
        <div className='text-colGray2 font-medium mb-2'>12.07.2023</div>
        <p className='text-sm font-medium break-all'>
          Lorem ipsum dolor sit amet consectetur. Tincidunt enim feugiat porta
          elit venenatis mauris convallis venenatis massa. Rhoncus gravida est
          pharetra tristique. Faucibus egestas arcu sed morbi integer. Blandit
          tempor rhoncus vulputate turpis pulvinar in id arcu. Enim malesuada
          tristique imperdiet imperdiet pulvinar nibh ac enim mauris. Mattis sed
          ante id a in nam cursus massa molestie. Bibendum at purus quam
          condimentum vitae elementum in ut accumsan. Aliquam non eget viverra
          dictum lacus ut nisl. Mauris vivamus consectetur neque duis.
          Condimentum tempus nisi sed ipsum lorem lacus in nunc molestie. Non
          amet sollicitudin placerat eget.
        </p>
      </div>
      <div className='flex justify-end mt-8'>
        <button
          className='max-w-[255px] w-full bg-black h-[48px] font-medium text-white rounded-[10px] hover:opacity-80 duration-150'
          type='submit'
        >
          Удалить
        </button>
      </div>
    </>
  );
};

export default NotificationDetail;
