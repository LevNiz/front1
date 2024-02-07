import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWalletHistory } from '../../../api/wallet';
import WalletHistory from './WalletHistory';
import { fetchUser } from '../../../api/client';
import { currency } from '../../../constants/currency';
import { ContentLoading } from '../../../helpers/Loader/Loader';
import { ErrorServer } from '../../../helpers/Errors/ErrorServer';
import { ErrorEmpty } from '../../../helpers/Errors/ErrorEmpty';
import emptyWallet from '../../../assets/images/empty-wallet.png';
import usaFlag from '../../../assets/images/usa.svg';
import ExchangeRate from './ExchangeRate';

const MyWallet = () => {
  const { userID } = useSelector((state) => state?.user);
  const [user, setUser] = useState(null);
  const { loading, error, walletHistory } = useSelector(
    (state) => state?.walletHistory
  );
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      await fetchWalletHistory(dispatch, userID);
    })();
  }, [dispatch, userID]);

  useEffect(() => {
    (async () => {
      const { success, data } = await fetchUser(userID);
      if (success) {
        setUser(data);
      }
    })();
  }, [userID]);

  return (
    <div className='pt-6 md:p-4 w-full'>
      <h3 className='ss:text-xl font-medium pb-5'>Мой кошелек</h3>
      {loading ? (
        <ContentLoading extraStyle='380px' />
      ) : error ? (
        <ErrorServer />
      ) : (
        <>
          <div className=''>
            <div className='w-full p-4 shadow-[0_0_12px_#dedede] rounded-xl flex justify-between items-center'>
              <div>
                <p className='text-sm pb-3'>Ваш текущий баланс</p>
                <div className='flex items-center'>
                  <img src={usaFlag} alt='*' />
                  <div className='pl-4 flex items-center'>
                    <p className='font-medium text-lg line-clamp-1 break-all whitespace-nowrap'>
                      {user && `$ ${user?.wallet[0]?.amount.toFixed(1)}`}
                    </p>
                    <span className='pt-[2px] pl-1 text-sm'>
                      {user &&
                        `(${(user?.wallet[0]?.amount * currency)?.toFixed(
                          1
                        )} сом)`}
                    </span>
                  </div>
                </div>
              </div>
              <NavLink
                to='top-up'
                state={{ user: user }}
                className='hover:opacity-80 p-3 rounded-xl border-2 border-colGray duration-150 sm:max-w-[200px] text-center w-full'
              >
                + Пополнить баланс
              </NavLink>
            </div>
          </div>
          <div className='flex space-x-5 mt-5'>
            <div className='w-[55%] shadow-[0_0_16px_#dedede] rounded-xl py-4 pl-4 pr-2'>
              <p className='text-sm pb-2'>История операций</p>
              {walletHistory?.length ? (
                <WalletHistory transactions={walletHistory} />
              ) : (
                <ErrorEmpty
                  title='Список пуст'
                  desc='Вы пока не делали операции по вашему кошелку'
                  image={emptyWallet}
                />
              )}
            </div>
            <div className='w-[45%] p-4 shadow-[0_0_12px_#dedede] rounded-xl'>
              <ExchangeRate />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MyWallet;
