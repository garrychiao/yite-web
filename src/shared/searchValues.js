import _ from 'lodash';

export default function searchValues(values, keyword) {
  return _.castArray(values).some((val) =>
    new RegExp(_.escapeRegExp(keyword), 'i').test(String(val))
  );
}
