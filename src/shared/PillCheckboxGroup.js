import _ from 'lodash';
import styled from 'styled-components';
import { useMemo } from 'react';
import { useSelections, useUpdateEffect } from 'ahooks';
import { Button } from 'antd';
import Icon from 'shared/Icon';
import { Flex } from 'shared/layout';
import color from 'shared/style/color';

export default function PillCheckboxGroup({
  value,
  onChange,
  options: optionsProp = [],
  ...restProps
}) {
  const options = useMemo(
    () => _.map(optionsProp, ({ value }) => value),
    [optionsProp]
  );
  const { selected, setSelected, toggle, isSelected } = useSelections(options);

  useUpdateEffect(() => {
    if (!_.isEqual(value, selected)) {
      setSelected(value);
    }
  }, [value]);

  useUpdateEffect(() => {
    if (!_.isEqual(value, selected)) {
      onChange(selected);
    }
  }, [selected]);

  return (
    <Flex gap={15} {...restProps}>
      {optionsProp.map((option) => (
        <StyledButton
          key={option.value}
          onClick={() => toggle(option.value)}
          style={{
            borderColor: isSelected(option.value)
              ? 'transparent'
              : color.primary,
            backgroundColor: isSelected(option.value)
              ? color.primaryLight
              : undefined,
          }}
        >
          <Flex gap={8}>
            {isSelected(option.value) && <Icon.CheckSmall />}
            {option.label}
          </Flex>
        </StyledButton>
      ))}
    </Flex>
  );
}

const StyledButton = styled(Button)`
  color: ${color.primary};
  border-radius: 50px;
`;
