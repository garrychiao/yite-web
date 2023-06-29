import moment from 'moment';
import styled from 'styled-components';
import { useMemo } from 'react';
import { DatePicker as AntdDatePicker } from 'antd';
import Icon from './Icon';

export default function DatePicker({ value, ...restProps }) {
  const momentValue = useMemo(
    () => (value ? moment(value) : undefined),
    [value]
  );
  return (
    <StyledDatePicker
      placeholder=""
      value={momentValue}
      format="YYYY/MM/DD"
      suffixIcon={<Icon.Calendar />}
      {...restProps}
    />
  );
}

const StyledDatePicker = styled(AntdDatePicker)`
  display: flex;
`;
