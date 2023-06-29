import styled from 'styled-components';
import { Menu } from 'antd';
import color from 'shared/style/color';

const StyledMenuItem = styled(Menu.Item)`
  &&& {
    display: flex;
    align-items: center;
    margin: 0;
    padding: 0 20px !important;
    height: 45px;
    border-radius: 45px;

    ::before,
    ::after {
      content: none;
    }

    &.ant-menu-item-selected {
      background: ${color.activeBg};
    }

    .ant-menu-item-icon {
      flex: none;
      display: inline-flex;
      align-items: center;
    }

    .ant-menu-title-content {
      margin-left: 15px;
      font-size: 15px;
    }
  }
`;

export default StyledMenuItem;
