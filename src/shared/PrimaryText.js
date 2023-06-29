import styled from 'styled-components';
import { Typography } from 'antd';
import color from './style/color';

const { Text } = Typography;

const PrimaryText = styled(Text)`
  color: ${color.primary};
`;

export default PrimaryText;
