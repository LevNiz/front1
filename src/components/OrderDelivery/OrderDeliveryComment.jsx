import { useForm } from 'react-hook-form';

const OrderDeliveryComment = () => {
  const { register } = useForm();

  return (
    <form className='pl-10'>
      <div className='max-w-[768px]'>
        <p className='font-medium mb-2'>
          Дополнительная информация или комментарий
        </p>
        <textarea
          className='w-full border border-colGray2 p-4 rounded-lg focus:border-black focus:outline-none resize-none'
          placeholder='Комментарий'
          {...register('comment', {
            required: 'Поле обязательно к заполнению!',
          })}
        />
      </div>
      <button
        type='submit'
        className='font-medium hover:opacity-80 p-3 flex justify-center items-center ml-auto rounded-lg bg-black text-white duration-150 max-w-[280px] w-full mt-5'
      >
        Далее
      </button>
    </form>
  );
};

export default OrderDeliveryComment;
