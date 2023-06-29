import { createGlobalStyle } from 'styled-components';
import color from 'shared/style/color';

export default createGlobalStyle`
  .ant-select {
    && .ant-select-selector {
      border-radius: 10px;
      border-color: ${color.border};
    }

    .ant-select-arrow {
      color: ${color.disabled};
    }
  }

  .ant-select-dropdown {
    border: 1px solid ${color.border};
    border-radius: 10px;
    box-shadow: none;
  }

  .ant-dropdown-menu {
    border-radius: 10px;
    max-height: 300px;
    overflow: auto;
  }

  .ant-select-multiple {
    .ant-select-selection-item {
      padding-left:15px;
      padding-right:10px;
      color: ${color.primary};
      background: ${color.activeBg};
      border-radius: 30px;
    }
    
    .ant-select-selection-item-content {
      margin-right: 8px;
    }
  }
`;
