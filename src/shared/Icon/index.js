import _ from 'lodash';
import styled from 'styled-components';
import AntdIcon from '@ant-design/icons';
import color from 'shared/style/color';
import * as icons from './Icon';

const StyledIcon = styled(AntdIcon)`
  svg path {
    fill: ${(props) => props.$primary && color.primary};
  }
`;

const Icon = _.mapValues(icons, (SvgIcon) => {
  return ({ svgProps, ...restProps }) => (
    <StyledIcon component={() => <SvgIcon {...svgProps} />} {...restProps} />
  );
});

export default Icon;
