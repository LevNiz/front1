const SApplicationComment = ({ register }) => {
  return (
    <div className='md:pl-5 lg:pl-10'>
      <div className='max-w-[768px]'>
        <p className='font-medium mb-2'>
          Дополнительная информация или комментарий
        </p>
        <textarea
          className='w-full border border-colGray2 p-4 rounded-lg focus:border-black focus:outline-none resize-none'
          placeholder='Комментарий'
          {...register('comment', {
            required: false,
          })}
        />
      </div>
    </div>
  );
};

export default SApplicationComment;
