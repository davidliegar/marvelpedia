import styled, { css } from 'styled-components';

const styles = css`
  color: var(--white);
  background: var(--stone-700);
  padding: var(--size-2) var(--size-4);
  border-radius: var(--radius-sm);
  text-decoration: none;

  &:hover {
    background: var(--stone-900);
  }
`
export const StyledButton = styled.button`${styles}`;

export const StyledLink = styled.a`${styles}`;