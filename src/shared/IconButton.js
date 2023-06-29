import styled from 'styled-components';
import { FileUnknownOutlined } from '@ant-design/icons';
import { Button } from 'antd';

export default function IconButton({
  icon = <FileUnknownOutlined />,
  ...restProps
}) {
  return <StyledButton type="link" icon={icon} {...restProps} />;
}

const StyledButton = styled(Button)`
  border: none;

  &&:disabled {
    background: transparent !important;
    border: none !important;
  }
`;
