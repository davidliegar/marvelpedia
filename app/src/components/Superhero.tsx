import type { Superhero } from "@marvelpedia/core";
import Button from "./Button";
import { Icon } from '@iconify/react';

interface SuperheroProps {
  hero: Superhero;
}

function Superhero({ hero }: SuperheroProps) {
  return (
    <article className="bg-white grid grid-rows-[240px_auto_max-content]">
      <img className="object-cover w-full h-full object-center" src={hero.img} alt={hero.name} />
      <div className="p-4">
        <h4 className="text-lg font-semibold py-4">{ hero.name }</h4>
        <p className="text-neutral-600 max-h-28 line-clamp-4">{ hero.description }</p>
      </div>

      <Button className="place-self-end m-4" to={hero.externalLink}>
        <div className="flex items-center gap-2">
          Read more
          <Icon icon="mdi:arrow-right" />
        </div>
      </Button>
    </article>
  )
}

export default Superhero
