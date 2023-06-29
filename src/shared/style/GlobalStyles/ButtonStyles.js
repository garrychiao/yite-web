import { createGlobalStyle } from 'styled-components';
import color from 'shared/style/color';

export default createGlobalStyle`
  .ant-btn {
    border-radius: 10px;

    &.ant-btn-primary {
      &:not(:disabled) {
        &:hover, &:active, &:focus {
          background: ${color.activeBg};
          color: ${color.primary}
        }
      }
    }
  }
`;
