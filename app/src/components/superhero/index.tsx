import type { Superhero } from "@marvelpedia/core";
import Button from "../button";
import { Icon } from '@iconify/react';
import { ButtonTextWrapper, StyledCard, StyledDescription, StyledImg, StyledTitle, StyledWrapper } from "./styles";

interface SuperheroProps {
  hero: Superhero;
}

function Superhero({ hero }: SuperheroProps) {
  return (
    <StyledCard>
      <StyledImg src={hero.img} alt={hero.name} />
      <StyledWrapper>
        <StyledTitle>{ hero.name }</StyledTitle>
        <StyledDescription>{ hero.description }</StyledDescription>
      </StyledWrapper>

      <Button data-testid="read-more-cta" className="hero-cta" to={hero.externalLink}>
        <ButtonTextWrapper>
          Read more
          <Icon icon="mdi:arrow-right" />
        </ButtonTextWrapper>
      </Button>
    </StyledCard>
  )
}

export default Superhero
