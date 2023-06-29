import _ from 'lodash';

/**
 * @param a - item to be sorted
 * @param b - item to be sorted
 * @param key - sort function or object key/path
 * @return {*[]} - values of a and b
 */
export function getCompareValues(a, b, key) {
  return _.isFunction(key) ? [key(a), key(b)] : [_.get(a, key), _.get(b, key)];
}
