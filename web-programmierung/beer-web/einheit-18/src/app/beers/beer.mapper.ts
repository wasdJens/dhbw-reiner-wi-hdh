import { BeerDto, CreateBeerDto } from './beers.api';
import { Beer, BeerInput, STYLE_NAMES } from './beer';

// Server-DTO → Client-Modell: Anzeigename des Stils, null wird zu einem fehlenden Feld
export function toBeer(dto: BeerDto): Beer {
  return {
    id: dto.id,
    name: dto.name,
    style: dto.style,
    styleName: STYLE_NAMES[dto.style],
    abv: dto.abv,
    breweryId: dto.breweryId,
    description: dto.description ?? undefined,
    averageRating: dto.averageRating ?? undefined,
  };
}

// Client-Modell → Server-DTO für POST und PATCH; eine leere Beschreibung entfällt
export function toBeerDto(input: BeerInput): CreateBeerDto {
  const dto: CreateBeerDto = {
    name: input.name,
    style: input.style,
    abv: input.abv,
    breweryId: input.breweryId,
  };
  if (input.description) {
    dto.description = input.description;
  }
  return dto;
}
