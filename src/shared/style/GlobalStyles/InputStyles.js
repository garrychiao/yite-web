import { createGlobalStyle } from 'styled-components';
import color from 'shared/style/color';

export default createGlobalStyle`
  .ant-input:not([readonly]), .ant-input-number, .ant-picker {
    border-radius: 10px;
    border-color: ${color.border};
  }

  .ant-input-number {
    width: 100%;

    .ant-input-number-handler-wrap {
      border-radius: 0 10px 10px 0;
    }
  }

  // search
  .ant-input-search-with-button {
    .ant-input-search-button.ant-btn-primary {
      padding: 0 8px;
      border-radius: 0 10px 10px 0 !important;
    }
  }

  // input group
  .ant-input-group {
    .ant-input-group-addon {
      &:first-child {
        border-radius: 10px 0 0 10px;
      }
    }

    &.ant-input-group-compact {
      && > * {
        :first-child {
          &, > .ant-select-selector, .ant-input, .ant-btn {
            border-radius: 10px 0 0 10px;
          }
        }

        :last-child {
          &, > .ant-select-selector, .ant-input, .ant-btn {
            border-radius: 0 10px 10px 0;
          }
        }
      }
    }
  }

  // input number group
  .ant-input-number-group {
    .ant-input-number {
      :not(:last-child) {
        border-right: none;
      }

      &.ant-input-number-disabled {
        + .ant-input-number-group-addon {
          background: #f5f5f5;
        }
      }
    }

    // addon of input
    .ant-input-number-group-addon {
      &:first-child {
        border-radius: 10px 0 0 10px;
      }

      &:last-child {
        color: ${color.disabled};
        background: transparent;
        border-radius: 0 10px 10px 0;
      }
    }
  }
`;
