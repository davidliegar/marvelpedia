import styled from "styled-components";

export const StyledCard = styled.article`
  background: var(--white);
  display: grid;
  grid-template-rows: 240px auto max-content;

  & .hero-cta {
    place-self: end;
    margin: var(--size-4);
  }
`

export const StyledImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`
export const StyledWrapper = styled.div`
  padding: var(--size-4);
`;

export const StyledTitle = styled.h4`
  font-size: 1.12rem;
  line-height: 1.75rem;
  font-weight: 600;
  padding: var(--size-4) 0;
`
export const StyledDescription = styled.p`
  max-height: 7rem;
  overflow: hidden;
  color: var(--stone-600);
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
` 

export const ButtonTextWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`