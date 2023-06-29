import i18n from 'i18next';
import styled from 'styled-components';
import { useState } from 'react';
import { ChromePicker } from 'react-color';
import { useBoolean } from 'ahooks';
import { Input, Popover, Space } from 'antd';
import Icon from './Icon';

/**
 * @see https://casesandberg.github.io/react-color
 * @param value
 * @param onChange
 * @return {JSX.Element}
 */
export default function ColorPicker({ value, onChange }) {
  const [visible, { setTrue: openPicker, setFalse: closePicker }] =
    useBoolean();
  const [_value, setValue] = useState(value);

  return (
    <Popover
      trigger="click"
      visible={visible}
      onVisibleChange={(_visible) => {
        if (!_visible) closePicker();
      }}
      content={
        <StyledChromePicker
          color={_value}
          onChange={(color) => setValue(color.hex)}
          onChangeComplete={(color) => onChange(color.hex)}
          disableAlpha
        />
      }
    >
      <Input
        addonBefore={
          <Space>
            <StyledTextColorIcon $color={value} />
            {i18n.t('顏色')}
          </Space>
        }
        value={value}
        onClick={openPicker}
      />
    </Popover>
  );
}

const StyledChromePicker = styled(ChromePicker)`
  box-shadow: none !important;
`;
const StyledTextColorIcon = styled(Icon.TextColor)`
  #text-color-bar {
    fill: ${(props) => props.$color};
  }
`;
