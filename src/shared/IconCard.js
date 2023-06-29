import styled from 'styled-components';
import Card from 'shared/card/Card';
import PrimaryText from 'shared/PrimaryText';
import color from 'shared/style/color';

export default function IconCard({
  icon,
  label,
  active,
  disabled,
  ...restProps
}) {
  return (
    <StyledCard $active={active} $disabled={disabled} {...restProps}>
      {icon}
      <PrimaryText style={{ marginTop: 'auto' }}>{label}</PrimaryText>
    </StyledCard>
  );
}

const StyledCard = styled(Card)`
  outline: ${(props) => {
    if (props.$active) return `1px solid ${color.primary}`;
    if (props.$disabled) return 'none !important';
  }};

  .ant-card-body {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    padding: 15px;
    width: 140px;
    height: 120px;
    cursor: ${(props) => (props.$disabled ? 'not-allowed' : 'pointer')};
    background: ${(props) =>
      props.$disabled && !props.$active && color.disabledBg};

    ::before,
    ::after {
      content: none;
    }
  }
`;
