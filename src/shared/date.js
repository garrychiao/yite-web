import moment from 'moment';

export function formatDate(date, format = 'YYYY/MM/DD') {
  return date ? moment(date).format(format) : null;
}
