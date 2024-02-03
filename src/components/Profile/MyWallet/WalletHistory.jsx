import { format } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';

const WalletHistory = ({ transactions }) => {
  return (
    <ul className='max-w-xl'>
      {transactions.map((transaction) => (
        <li key={transaction?.id} className='mb-4 p-4 rounded-lg shadow-md'>
          <div className='flex justify-between items-center'>
            <div>
              <p className='mm:text-lg font-medium pr-3 max-w-[270px] mm:max-w-full leading-[18px] mm:leading-6'>
                {transaction?.description}
              </p>
              <p className='text-gray-500 pt-2 text-sm'>
                {format(new Date(transaction?.date), 'd MMMM yyyy, HH:mm', {
                  locale: ruLocale,
                })}
              </p>
            </div>
            <p
              className={`text-${
                transaction?.amount >= 0 ? 'green' : 'red'
              }-500 font-bold`}
            >
              {transaction.amount >= 0
                ? `+${transaction?.amount?.toFixed(2)}`
                : transaction?.amount?.toFixed(2)}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default WalletHistory;
