import styled from 'styled-components';
import { Space } from 'antd';

export default function ActionSpace({ justify, ...restProps }) {
  return (
    <ActionSpaceLayout
      size={[20, 20]}
      align="center"
      justify={justify}
      wrap
      {...restProps}
    />
  );
}

const ActionSpaceLayout = styled(Space)`
  flex: none;
  display: flex;
  justify-content: ${(props) => props.justify};
  margin-top: ${(props) => props.$marginTop && '20px'};
  margin-bottom: ${(props) => props.$marginBottom && '20px'};
`;
