import { format } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';
import arrowImg from '../../../assets/icons/arrow-left.svg';

const WalletHistory = ({ transactions }) => {
  return (
    <ul className='h-[440px] overflow-y-scroll scrollable pr-3'>
      {transactions.map((transaction) => (
        <li key={transaction?.id} className='py-4 border-b border-colGray3'>
          <div className='flex justify-between items-center'>
            <div className='flex items-center'>
              <div className='w-7 h-7 min-w-[28px] rounded-full bg-gray-200 flex justify-center items-center'>
                <img src={arrowImg} alt='*' />
              </div>
              <div className='pl-3'>
                <p className='pr-2 leading-4 pb-[2px]'>
                  {transaction?.description}
                </p>
                <p className='text-gray-500 text-xs'>
                  {format(new Date(transaction?.date), 'd MMMM yyyy, HH:mm', {
                    locale: ruLocale,
                  })}
                </p>
              </div>
            </div>
            <p
              className={`text-${
                transaction?.amount > 0 ? 'green' : 'red'
              }-500 font-medium whitespace-nowrap`}
            >
              {transaction.amount > 0
                ? `+${transaction?.amount?.toFixed(1)} $`
                : `-${transaction?.amount?.toFixed(1)} $`}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default WalletHistory;
