import styled from 'styled-components';
import { useReactive } from 'ahooks';
import { Button } from 'antd';
import color from './style/color';

export default function CheckboxButton({
  value,
  onChange,
  children,
  ...restProps
}) {
  const state = useReactive({ value });
  return (
    <StyledButton
      onClick={() => {
        state.value = !state.value;
        onChange(state.value);
      }}
      {...restProps}
      $active={state.value}
    >
      {children}
    </StyledButton>
  );
}

const StyledButton = styled(Button)`
  width: 40px;
  background-color: ${(props) => props.$active && color.activeBg} !important;
  border-color: ${(props) => props.$active && color.primary} !important;
  z-index: ${(props) => props.$active && 1};

  &:focus {
    border-color: #d9d9d9;
  }
`;
