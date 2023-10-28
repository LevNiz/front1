import { format, isToday } from 'date-fns';

const FormatDate = (dateFormat) => {
  const date = new Date(
    dateFormat?.seconds * 1000 + dateFormat?.nanoseconds / 1000000
  );
  const formattedTime = format(date, 'H:mm');
  if (isToday(date)) {
    return formattedTime;
  } else {
    return format(date, 'd MMMM yyyy');
  }
};

export default FormatDate
