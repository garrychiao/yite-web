import { createGlobalStyle } from 'styled-components';
import color from 'shared/style/color';

export default createGlobalStyle`
  .ant-radio-group-outline {
    .ant-radio-button-wrapper {
      :focus-within {
        z-index: 1;
      }

      :first-child {
        border-radius: 10px 0 0 10px;
      }

      :last-child {
        border-radius: 0 10px 10px 0;
      }

      &.ant-radio-button-wrapper-checked {
        background: ${color.activeBg};
      }
    }
  }
`;
