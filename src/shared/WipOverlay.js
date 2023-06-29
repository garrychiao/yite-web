import i18n from 'i18next';
import styled from 'styled-components';

export default function WipOverlay(props) {
  return <Layout {...props}>{i18n.t('尚未開放')}</Layout>;
}

const Layout = styled.div`
  z-index: 1;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  font-size: 30px;
  font-weight: bold;
  color: white;
  background-color: #46465372;
`;
