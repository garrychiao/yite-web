import _ from 'lodash';

export default function getOptionLabel(
  options,
  value,
  { valueKey, labelKey } = {}
) {
  return _.find(options, { [valueKey ?? 'value']: value })?.[
    labelKey ?? 'label'
  ];
}
