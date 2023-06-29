import { getCompareValues } from './utils';

/**
 * @param key
 * @param orderList - the ordered value list
 * @return {function(*=, *=)} compare function
 * @example
 * [{ status: 'pending' }, { status: 'success' }]
 * after sorted by mapValSorter('status', ['success', 'pending'])
 * [{ status: 'success' }, { status: 'pending' }]
 */
export default function mapValSorter(key, orderList = []) {
  return (a, b) => {
    const [aVal, bVal] = getCompareValues(a, b, key);
    return orderList.indexOf(aVal) - orderList.indexOf(bVal);
  };
}
