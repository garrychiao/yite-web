import styled from 'styled-components';
import { Button } from 'antd';
import color from 'shared/style/color';

const SsoButton = styled(Button)`
  && {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 25px;
    height: 50px;
    width: 100%;
    font-size: inherit;
    border-color: ${color.primary};
    box-shadow: 0 3px 6px ${color.shadow};

    &:hover {
      background: ${color.activeBg};
    }

    svg {
      width: 25px;
      height: 25px;
    }

    .ant-btn-loading-icon {
      display: inline-flex;
    }
  }
`;

export default SsoButton;
