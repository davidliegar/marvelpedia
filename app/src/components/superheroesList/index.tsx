import { useAppSelector } from "@/app/reduxHooks"
import LoadingHero from "@/components/loadingHero"
import Superhero from "@/components/superhero"
import { superheroes } from "@marvelpedia/core"
import noResultsImg from '@/assets/deadpool-ops.png';
import { EmptyState, StyledMasking, StyledList, StyledMaskImg, StyledDescription } from "./styles";

const SuperheroesList = ({ loading = false }) => {
  const superheroesSelector = useAppSelector(superheroes.selectAll)

  const hasContent = superheroesSelector.length > 0 || loading

  const renderedHeroes = superheroesSelector.map(superheroe => (
    <Superhero hero={superheroe} key={superheroe.id} />
  ))

  if (loading) {
    renderedHeroes.push(<LoadingHero key="loading" />)
  }

  const list = <StyledList>
    {renderedHeroes}
  </StyledList>

  const empty = <EmptyState>
    <StyledMasking>
      <StyledMaskImg src={noResultsImg} alt="no result" />
    </StyledMasking>
    <StyledDescription>Ops, we couldn't find your superhero, try with another name</StyledDescription>
  </EmptyState>

  return (
    hasContent ? list : empty
  )
}

export default SuperheroesList