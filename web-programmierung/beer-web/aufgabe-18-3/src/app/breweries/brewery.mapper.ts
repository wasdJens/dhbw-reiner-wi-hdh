import { BreweryDto, CreateBreweryDto } from './breweries.api';
import { Brewery, BreweryInput } from './brewery';

// Server-DTO → Client-Modell: Ort und Land als eine Angabe
export function toBrewery(dto: BreweryDto): Brewery {
  return {
    id: dto.id,
    name: dto.name,
    city: dto.city,
    country: dto.country,
    location: `${dto.city}, ${dto.country}`,
  };
}

// Client-Modell → Server-DTO für POST und PATCH
export function toBreweryDto(input: BreweryInput): CreateBreweryDto {
  return { name: input.name, city: input.city, country: input.country };
}
