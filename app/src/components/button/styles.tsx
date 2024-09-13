import styled, { css } from 'styled-components';

interface ButtonProps {
  variant: 'primary' | 'secondary';
}

const primaryStyles = css`
  --bg: var(--stone-700);
  --bg-hover: var(--stone-900);
  --color: var(--white);
`;

const secondaryStyles = css`
  --bg: var(--white);
  --bg-hover: var(--stone-200);
  --color: var(--stone-700);
`;

const styles = css<ButtonProps>`
  padding: var(--size-2) var(--size-4);
  border-radius: var(--radius-sm);
  text-decoration: none;
  border: 1px solid var(--stone-700);
  background: var(--bg);
  color: var(--color);

  &:hover {
    background: var(--bg-hover);
  }

  ${(props) => (props.variant === 'primary' ? primaryStyles : secondaryStyles)};
`
export const StyledButton = styled.button<ButtonProps>`${styles}`;

export const StyledLink = styled.a<ButtonProps>`${styles}`;