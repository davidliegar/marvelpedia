import { StyledButtonLoader, StyledCard, StyledDescriptionLoader, StyledImgLoader, StyledTitleLoader, StyledWrapperDiv } from "./styles"

function LoadingHero() {
  return (
    <StyledCard data-testid="loading">
      <StyledImgLoader />
      <StyledWrapperDiv>
        <StyledTitleLoader />
        <StyledDescriptionLoader />
      </StyledWrapperDiv>

      <StyledButtonLoader />
    </StyledCard>
  )
}

export default LoadingHero
