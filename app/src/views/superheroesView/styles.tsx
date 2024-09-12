import { desktop, tablet } from "@/styles/mediaQueries";
import styled from "styled-components";

export const StyledSuperheroView = styled.div`
  max-width: 1024px;
  width: 90%;
  margin: 0 auto;

  & .search-input {
    width: 100%;

    @media ${tablet} {
      width: 66%;
    }

    @media ${desktop} {
      width: 50%;
    }
  }
`

export const StyledHeader = styled.header`
  position: sticky;
  top: 0;
  background: var(--grey-200);
  padding: var(--size-4) 0;

  @media ${desktop} {
    margin-top: 5rem;
  }
`

export const StyledTitle = styled.h1`
  font-weight: 700;
  color: var(--grey-700);
  margin-bottom: 2rem;
  font-size: 2.25rem;
  line-height: 2.5rem;
`

export const StyledError = styled.p`
  padding: var(--size-2);
  background: var(--red-500);
  color: var(--white);
`

export const StyledFooter = styled.footer`
  margin: 6rem 0 4rem;
  color: var(--stone-600);
`

