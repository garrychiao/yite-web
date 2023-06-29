import _ from 'lodash';
import getOptionLabel from 'shared/getOptionLabel';
import stringSorter from './stringSorter';

export default function optionLabelSorter(key, options) {
  return stringSorter((record) => getOptionLabel(options, _.get(record, key)));
}
