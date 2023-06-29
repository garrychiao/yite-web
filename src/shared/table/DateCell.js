import { formatDate } from 'shared/date';

export default function DateCell({ value, format = 'YYYY/MM/DD' }) {
  return formatDate(value, format);
}
