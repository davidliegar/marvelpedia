import styled, { css, keyframes, } from 'styled-components';

const pulse = keyframes`
 50% { opacity: 0.5; }
`,
 animation = css`
  animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
`

export const StyledCard = styled.div`
  background: var(--white);
  display: grid;
  grid-template-rows: 240px auto max-content;
`;

export const StyledImgLoader = styled.div`
  width: 100%;
  height: 100%;
  background: var(--stone-200);
  ${animation}
`;

export const StyledTitleLoader = styled.div`
  padding: var(--size-4) 0;
  width: 50%;
  height: 2.5rem;
  background: var(--stone-200);
  ${animation}
`;


export const StyledDescriptionLoader = styled(StyledTitleLoader)`
  width: 100%;
  margin-top: var(--size-4);
`;

export const StyledButtonLoader = styled.div`
  width: 40%;
  height: 2.5rem;
  background: var(--stone-200);
  margin: var(--size-4);
  place-self: end;
  ${animation}
`;

export const StyledWrapperDiv = styled.div`
  padding: var(--size-4);
`;

