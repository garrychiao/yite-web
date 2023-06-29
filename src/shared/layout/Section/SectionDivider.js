import styled from 'styled-components';
import { Divider } from 'antd';
import color from 'shared/style/color';

const SectionDivider = styled(Divider).attrs((props) => ({
  dashed: true,
  ...props,
}))`
  && {
    margin: 0;
    border-color: ${color.secondary};
  }
`;

export default SectionDivider;
