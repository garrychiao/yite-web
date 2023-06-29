import styled from 'styled-components';

const Toolbar = styled.div.attrs((props) => ({
  margins: true,
  ...props,
}))`
  flex: none;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  min-height: 32px; // height of action button
  margin-bottom: ${(props) => (props.margins ? '20px' : 0)};
`;

export default Toolbar;
