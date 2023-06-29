import _ from 'lodash';
import styled from 'styled-components';

const Flex = styled.div`
  display: flex;
  flex-direction: ${(props) => props.direction};
  align-items: ${(props) => props.align ?? 'center'};
  justify-content: ${(props) => props.justify};
  flex-wrap: ${(props) => props.wrap};
  gap: ${(props) => (_.isNumber(props.gap) ? `${props.gap}px` : props.gap)};
`;

export default Flex;
