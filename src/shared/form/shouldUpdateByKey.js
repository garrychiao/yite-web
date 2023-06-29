import _ from 'lodash';

/**
 * create a function for shouldUpdate prop of the Form.Item
 * return true if any of the keys are changed
 * @param {string|string[]} key - a key string or a string array of keys
 * @returns {function} shouldUpdate function
 */
export default function shouldUpdateByKey(key) {
  const keys = _.castArray(key);
  return (preVal, curVal) =>
    _.some(keys, (k) => _.get(preVal, k) !== _.get(curVal, k));
}
