import { format, isToday } from 'date-fns';
import { ru } from 'date-fns/locale';

export const FormatDate = (dateFormat) => {
  const date = new Date(
    dateFormat?.seconds * 1000 + dateFormat?.nanoseconds / 1000000
  );
  const formattedTime = format(date, 'H:mm', { locale: ru });
  if (isToday(date)) {
    return formattedTime;
  } else {
    return format(date, 'd MMMM yyyy', { locale: ru });
  }
};
