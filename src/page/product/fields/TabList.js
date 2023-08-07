import styled from 'styled-components';
import { Typography, Tabs } from 'antd';
import { useResponsive } from 'ahooks';
import IntroTab from './IntroTab';
import SpecTab from './SpecTab';
import FileTab from './FileTab';

const { Title } = Typography;

export default function TabList({ introTabData, specTabData, downloadFiles }) {

  const { sm } = useResponsive();

  const items = [
    {
      key: '1',
      label: '產品介紹',
      children: <IntroTab introTabData={introTabData} />,
    },
    {
      key: '2',
      label: `產品規格`,
      children: <SpecTab specTabData={specTabData} />,
    },
    {
      key: '3',
      label: `檔案下載`,
      children: <FileTab downloadFiles={downloadFiles} />,
    },
  ];


  return (<StyledTabs
    centered
    defaultActiveKey="1"
    items={items}
    size='large'
    tabBarGutter={sm ? 100: 50}
    onChange={() => { }} />)

}

const StyledTabs = styled(Tabs)`
  width: 100%;
  font-size: 20px;
`

const StyledTabBar = styled(Tabs)`
  width: 200px;
  color: #000;
`