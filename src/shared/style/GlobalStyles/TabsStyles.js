import { createGlobalStyle } from 'styled-components';
import color from 'shared/style/color';

export default createGlobalStyle`
  .ant-tabs-nav {
    && {
      margin-bottom: 0;
    }
  }

  .ant-tabs-nav-list {
    flex: 1;
  }

  .ant-tabs-tab {
    flex: 1;
    justify-content: center;
    margin: 0 !important;
    color: ${color.primary}
  }

  .ant-tabs-tab-btn {
    display: inline-flex;
    align-items: center;
  }
`;
