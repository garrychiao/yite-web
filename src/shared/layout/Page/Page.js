import styled from 'styled-components';
import { useMount, useUnmount } from 'ahooks';
import PropTypes from 'prop-types';

export default function Page({ title, full, paddings, ...restProps }) {
  useMount(() => {
    if (title) document.title = `${process.env.REACT_APP_TITLE} - ${title}`;
  });
  useUnmount(() => {
    if (title) document.title = process.env.REACT_APP_TITLE;
  });

  return <PageLayout full={full} paddings={paddings} {...restProps} />;
}

Page.propTypes = {
  title: PropTypes.string,
  full: PropTypes.bool,
  paddings: PropTypes.bool,
};
Page.defaultProps = {
  title: '',
  full: false,
  paddings: false,
};

const PageLayout = styled.div`
  flex: ${(props) => (props.full ? '1' : '0 0 fit-content')};
  display: flex;
  flex-direction: column;
  padding: ${(props) => (props.paddings ? '30px' : 0)};
  background: transparent;
  overflow-x: hidden;
  overflow-y: auto;
`;
