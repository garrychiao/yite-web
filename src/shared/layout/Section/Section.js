import styled, { css } from 'styled-components';
import color from 'shared/style/color';

const Section = styled.section`
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 3px 6px ${color.shadow};
  background: #fff;

  ${(props) =>
    props.$full &&
    css`
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: auto;
    `}
`;

export default Section;
