import styled from 'styled-components';

export const StyledInput = styled.input`
  width: 100%;
  padding: var(--size-2) var(--size-4);
  border: 1px solid var(--grey-300);
  border-top-left-radius: var(--radius-sm);
  border-bottom-left-radius: var(--radius-sm);
  height: 2.5rem;
  font-size: 100%;
  margin: 0;

  &::placeholder {
    color: var(--grey-500);
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    pointer-events: none;
  }
`;

export const StyledButton = styled.button`
  color: var(--white);
  border-top-right-radius: var(--radius-sm);
  border-bottom-right-radius: var(--radius-sm);
  padding: var(--size-2);
  height: 2.5rem;
  background: var(--red-500);

  &:hover {
    background: var(--red-600);
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    opacity: 0.75;
    pointer-events: none;
  }

  & svg {
    width: 1.25rem;
    height: 1.25rem;
    display: block;
  }
`;

export const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
`;