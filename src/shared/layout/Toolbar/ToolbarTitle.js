import styled from 'styled-components';
import { Typography } from 'antd';
import color from 'shared/style/color';

const { Title } = Typography;

const ToolbarTitle = styled(Title).attrs((props) => ({
  level: 5,
  ...props,
}))`
  && {
    font-size: ${(props) => props.$pageTitle && '18px'};
    font-weight: 500;
    margin-bottom: 0;
    color: ${color.primary};
  }
`;

export default ToolbarTitle;
