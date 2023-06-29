import styled from 'styled-components';
import { Col } from 'antd';

export default function FormCol({
  full = false,
  stretchLabel = true,
  ...restProps
}) {
  const gridProps = !full && {
    md: { span: 24 },
    xl: { span: 12 },
  };
  const Component = stretchLabel ? StretchLabelCol : Col;

  return <Component span={24} {...gridProps} {...restProps} />;
}

const StretchLabelCol = styled(Col)`
  display: flex;
  flex-direction: column;

  > .ant-form-item {
    flex: 1;

    > .ant-form-item-label {
      flex: 1;
      display: flex;
      min-height: 0;
    }

    > .ant-form-item-control {
      flex: none;
    }
  }
`;
