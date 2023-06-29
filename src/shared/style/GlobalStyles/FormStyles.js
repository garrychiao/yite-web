import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  .ant-form-item-label {
    label {
      white-space: nowrap;

      &.ant-form-item-required:not(.ant-form-item-required-mark-optional) {
        &::before {
          margin: 0 0 0 4px;
          order: 999;
        }
        &::after {
          content: none;
        }

        .ant-tag {
          order: 1000;
        }
      }
    }
  }
`;
