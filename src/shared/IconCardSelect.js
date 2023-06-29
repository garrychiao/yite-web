import { Space } from 'antd';
import IconCard from 'shared/IconCard';

export default function IconCardSelect({
  options = [],
  value,
  onChange,
  disabled,
  ...restProps
}) {
  return (
    <Space size={25} {...restProps}>
      {options.map((option) => (
        <IconCard
          key={option.value}
          icon={option.icon}
          label={option.label}
          active={value === option.value}
          disabled={disabled}
          onClick={() => onChange(option.value)}
        />
      ))}
    </Space>
  );
}
