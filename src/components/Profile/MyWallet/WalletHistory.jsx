import { format } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';

const WalletHistory = ({ transactions }) => {
  return (
    <ul className='grid lg:grid-cols-2 gap-5'>
      {transactions.map((transaction) => (
        <li key={transaction?.id} className='p-4 rounded-lg shadow-md'>
          <div className='flex justify-between items-end'>
            <div>
              <p className='font-medium pr-3 leading-[18px]'>
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
                ? `+${transaction?.amount?.toFixed(1)}`
                : transaction?.amount?.toFixed(1)}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default WalletHistory;
