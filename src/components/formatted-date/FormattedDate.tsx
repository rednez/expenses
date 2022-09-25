import { format, isToday, isValid, isYesterday, parseISO } from 'date-fns';

export interface DateStringProps {
  date: string;
}

export function FormattedDate(props: DateStringProps) {
  const formatDate = (): string => {
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
  };

  return <div>{formatDate()}</div>;
}

export default FormattedDate;
