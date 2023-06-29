import styled from 'styled-components';
import { useEffect } from 'react';
import { useBoolean } from 'ahooks';
import { Menu } from 'antd';
import Icon from 'shared/Icon';

export default function SideMenuItemGroup({ title, collapsed, ...restProps }) {
  const [groupCollapsed, { toggle, setFalse: setGroupCollapsedFalse }] =
    useBoolean();

  // open group menu if main sider collapsed
  useEffect(() => {
    if (collapsed) {
      setGroupCollapsedFalse();
    }
  }, [collapsed, setGroupCollapsedFalse]);

  return (
    <StyledMenuItemGroup
      title={
        title && (
          <GroupTitle onClick={() => toggle()}>
            {title}
            <Icon.NavArrowDown
              style={{
                transition: 'all ease .2s',
                transform: !groupCollapsed && 'rotate(180deg)',
              }}
            />
          </GroupTitle>
        )
      }
      $collapsed={groupCollapsed}
      {...restProps}
    />
  );
}

const StyledMenuItemGroup = styled(Menu.ItemGroup)`
  .ant-menu-item-group-title {
    padding: 0;
    cursor: pointer;
    margin-bottom: ${(props) => props.title && !props.$collapsed && '30px'};
  }

  .ant-menu-item-group-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
    height: ${(props) => (props.$collapsed ? 0 : 'auto')};
  }
`;
const GroupTitle = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
`;
