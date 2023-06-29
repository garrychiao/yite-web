import moment from 'moment';
import styled from 'styled-components';
import { useMemo } from 'react';
import { DatePicker } from 'antd';

const { RangePicker: AntdRangePicker } = DatePicker;

export default function RangePicker({ value, ...restProps }) {
  const momentValue = useMemo(() => {
    const [start, end] = value ?? [];
    return [start ? moment(start) : undefined, end ? moment(end) : undefined];
  }, [value]);
  return (
    <StyledRangePicker
      placeholder={[]}
      value={momentValue}
      format="YYYY/MM/DD"
      {...restProps}
    />
  );
}

const StyledRangePicker = styled(AntdRangePicker)`
  display: flex;
`;
