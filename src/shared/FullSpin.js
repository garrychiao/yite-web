import styled from 'styled-components';
import { Spin } from 'antd';

const FullSpin = styled(Spin)`
  z-index: 100;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  height: 100%;
  background: ${(props) => {
    const bgColor = {
      gray: 'rgb(247, 247, 247, .5)',
      white: 'rgb(255, 255, 255, .5)',
    };
    return bgColor[props.bg];
  }};
`;

export default FullSpin;
