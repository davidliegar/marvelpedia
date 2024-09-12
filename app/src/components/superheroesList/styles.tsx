import { desktop, tablet } from "@/styles/mediaQueries";
import styled, { keyframes} from "styled-components";

export const StyledList = styled.section`
  --num-column: 1;

  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(var(--num-column), minmax(0, 1fr));

  @media ${tablet} { 
    --num-column: 2;
  }

  @media ${desktop} { 
    --num-column: 3;
  }
`

const scale = keyframes`
  0%   {transform: scale(1);}
  100% {transform: scale(1.1);}
`
export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  @media ${tablet} {
    width: 13rem;
  }
`

export const StyledMasking = styled.div`
  width: 200px;
  aspect-ratio: 1;
  background:
  radial-gradient(at 70% 31%,var(--red-700) 29%,#a2090900 30%),
  radial-gradient(at 30% 31%,var(--red-700) 29%,#0000 30%),
  linear-gradient(var(--red-700) 0 0) bottom/100% 50% no-repeat;
  clip-path: polygon(-43% 0,50% 91%, 143% 0);
  animation: ${scale} 1000ms alternate infinite ease-in;
`

export const StyledMaskImg = styled.img`
  clip-path: polygon(-42% 0,50% 91%, 142% 0);
`

export const StyledDescription = styled.p`
  text-align: center;
`