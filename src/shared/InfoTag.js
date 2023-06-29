import styled from 'styled-components';
import { Tag } from 'antd';
import Icon from 'shared/Icon';
import color from './style/color';

export default function InfoTag(props) {
  return <StyledTag color={color.infoBg} icon={<Icon.Info />} {...props} />;
}

const StyledTag = styled(Tag)`
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  color: ${color.primary};
  font-weight: normal;
  white-space: initial;
  border-radius: 10px;

  && > .anticon + span {
    margin-left: 10px;
  }
`;
