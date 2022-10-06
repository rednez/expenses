import { format, isToday, isValid, isYesterday, parseISO } from 'date-fns';
import { useMemo } from 'react';

export interface DateStringProps {
  date: string;
}

export function FormattedDate(props: DateStringProps) {
  const formattedDate = useMemo(() => {
    const value = props.date;

    if (!isValid(parseISO(value))) {
      return 'invalid date';
    }

    const isoValue = parseISO(value);

    return isToday(isoValue)
      ? 'Today'
      : isYesterday(isoValue)
      ? 'Yesterday'
      : format(parseISO(value), 'dd.MM.yyyy');
  }, [props.date]);

  return <div>{formattedDate}</div>;
}

export default FormattedDate;
