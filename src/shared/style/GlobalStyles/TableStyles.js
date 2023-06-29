import { createGlobalStyle } from 'styled-components';
import color from 'shared/style/color';

export default createGlobalStyle`
  .ant-table {
    table {
      border-collapse: collapse;
    }
  }

  .ant-table-thead {
    & > tr > .ant-table-cell {
      padding: 0 20px;
      height: 40px;
      border: none;
      background: ${color.activeBg} !important;
      font-size: 14px;
      color: ${color.primary};

      &::before {
        z-index: 1;
        height: 100% !important;
        background: ${color.activeBg} !important;
      }

      &:first-child {
        border-radius: 10px 0 0 10px !important;
      }

      &:last-child {
        border-radius: 0 10px 10px 0 !important;
      }
    }
  }

  .ant-table-tbody {
    & > tr > .ant-table-cell {
      padding: 25px 20px;
      border-bottom: none;
    }

    &&& .ant-table-cell-row-hover {
      background: ${color.bg};
    }
  }

  // pagination styles
  .ant-table-pagination {
    && {
      margin: 0;
      padding-top: 30px;
    }

    .ant-pagination-item {
      border-radius: 3px;
    }
  }
`;
