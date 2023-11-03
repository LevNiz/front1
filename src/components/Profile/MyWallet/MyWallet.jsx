import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWalletHistory } from '../../../api/wallet';
import { ContentLoading } from '../../../helpers/Loader/Loader';
import { ErrorServer } from '../../../helpers/Errors/ErrorServer';
import { ErrorEmpty } from '../../../helpers/Errors/ErrorEmpty';

const MyWallet = () => {
  const { loading, error, walletHistory } = useSelector(
    (state) => state?.walletHistory
  );
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      await fetchWalletHistory(dispatch);
    })();
  }, []);

  return (
    <div className='pt-6 md:p-4 w-full'>
      <div className='lg:flex justify-between items-center'>
        <div className='flex justify-between lg:max-w-sm w-full p-4 sm:p-6 shadow-[0_0_12px_#00000026] rounded-md mb-8 lg:mb-0'>
          <div className='text-center w-[48%]'>
            <p className='opacity-60'>GivBox coins</p>
            <span className='font-medium break-all'>0.0</span>
          </div>
          <div className='min-w-[2px] h-10 bg-gray-300'></div>
          <div className='text-center w-[48%]'>
            <p className='opacity-60'>Бонусы</p>
            <span className='font-medium break-all'>0.0</span>
          </div>
        </div>
        <NavLink
          to='top-up'
          className='lg:block flex justify-center font-medium hover:opacity-80 p-4 rounded-lg bg-colYellow duration-150 sm:max-w-[240px] text-center w-full'
        >
          Пополнить баланс
        </NavLink>
      </div>
      <h3 className='mt-8 mb-5 font-medium'>История операций</h3>
      {loading ? (
        <ContentLoading extraStyle='380px' />
      ) : error ? (
        <ErrorServer />
      ) : walletHistory?.length ? (
        'Wallets'
      ) : (
        <ErrorEmpty
          title='Список пуст'
          desc='Вы пока не делали операции по вашему кошелку'
        />
      )}
    </div>
  );
};

export default MyWallet;
