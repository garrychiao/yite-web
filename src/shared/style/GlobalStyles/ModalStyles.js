import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  .ant-modal {
    max-height: 100%;
  }
  .ant-modal-content {
    display: flex;
    flex-direction: column;
    max-height: calc(100vh - 200px);
    border-radius: 10px;
  }
  .ant-modal-body {
    flex: 1;
    height: 0;
    overflow-y: auto;
  }
`;
