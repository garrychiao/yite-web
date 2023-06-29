import { getCompareValues } from './utils';

export default function numberSorter(key) {
  return (a, b) => {
    const [aVal, bVal] = getCompareValues(a, b, key);
    return +aVal - +bVal;
  };
}
