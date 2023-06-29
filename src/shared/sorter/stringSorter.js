import { getCompareValues } from './utils';

export default function stringSorter(key) {
  return (a, b) => {
    const [aVal, bVal] = getCompareValues(a, b, key);
    return aVal?.toString().localeCompare?.(bVal?.toString());
  };
}
