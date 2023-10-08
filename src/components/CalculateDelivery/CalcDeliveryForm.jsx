import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';

export const CalcDeliveryForm = ({ cityOptions, onSubmit }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='grid grid-cols-3 gap-6'>
        <div className='mb-4'>
          <p className='font-medium mb-2'>Город отправки</p>
          <Controller
            name='senderCity'
            control={control}
            rules={{ required: 'Поле обязательно к заполнению!' }}
            render={({ field }) => (
              <Select
                {...field}
                options={cityOptions}
                placeholder='Выберите город'
                onChange={(selectedOption) => {
                  field.onChange(selectedOption);
                }}
                styles={{
                  control: (provided) => ({
                    ...provided,
                    padding: '8px',
                  }),
                }}
              />
            )}
          />
          {errors?.senderCity && (
            <p className='text-red-500 mt-1 text-sm'>
              {errors?.senderCity.message || 'Error!'}
            </p>
          )}
        </div>
        <div className='mb-4'>
          <p className='font-medium mb-2'>Город назначения</p>
          <Controller
            name='receiverCity'
            control={control}
            rules={{ required: 'Поле обязательно к заполнению!' }}
            render={({ field }) => (
              <Select
                {...field}
                options={cityOptions}
                placeholder='Выберите город'
                onChange={(selectedOption) => {
                  field.onChange(selectedOption);
                }}
                styles={{
                  control: (provided) => ({
                    ...provided,
                    padding: '8px',
                  }),
                }}
              />
            )}
          />
          {errors?.receiverCity && (
            <p className='text-red-500 mt-1 text-sm'>
              {errors?.receiverCity.message || 'Error!'}
            </p>
          )}
        </div>
        <div className='mb-4'>
          <p className='font-medium mb-2'>Размер посылки</p>
          <Controller
            name='city'
            control={control}
            rules={{ required: 'Поле обязательно к заполнению!' }}
            render={({ field }) => (
              <Select
                {...field}
                options={cityOptions}
                placeholder='Выберите город'
                onChange={(selectedOption) => {
                  field.onChange(selectedOption);
                }}
                styles={{
                  control: (provided) => ({
                    ...provided,
                    padding: '8px',
                  }),
                }}
              />
            )}
          />
          {errors?.city && (
            <p className='text-red-500 mt-1 text-sm'>
              {errors?.city.message || 'Error!'}
            </p>
          )}
        </div>
      </div>
      <button
        type='submit'
        className='uppercase font-medium hover:opacity-80 p-4 rounded-lg bg-black text-white duration-150 max-w-[320px] w-full ml-auto flex justify-center items-center mt-5'
      >
        Рассчитать
      </button>
    </form>
  );
};
