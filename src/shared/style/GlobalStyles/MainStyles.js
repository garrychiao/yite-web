import { createGlobalStyle } from 'styled-components';
import color from 'shared/style/color';

export default createGlobalStyle`
  body {
    margin: unset;
    background-color: #fff;
    font-size: 20px;
  }

  .ant-layout {
    background-color: #fff;
  }

  #webpack-dev-server-client-overlay {
    display:none;
  }
  .slick-dots li button:before {
    display: none;
  }
`;
