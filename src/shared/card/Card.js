import styled from 'styled-components';
import { Card } from 'antd';
import color from 'shared/style/color';

const StyledCard = styled(Card)`
  box-shadow: 0 3px 6px ${color.shadow};
  box-sizing: border-box;
  border-radius: 10px;
  border: none;
  opacity: 1;

  :hover {
    background: ${color.activeBg};
    outline: 1px solid ${color.primary};
  }
`;

export default StyledCard;
