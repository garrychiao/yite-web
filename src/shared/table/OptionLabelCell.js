import getOptionLabel from 'shared/getOptionLabel';

export default function OptionLabelCell({
  value,
  options,
  defaultValue = null,
  valueKey,
  labelKey,
}) {
  return (
    getOptionLabel(options, value, { valueKey, labelKey }) ??
    String(value) ??
    defaultValue
  );
}
