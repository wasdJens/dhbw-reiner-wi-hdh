import { Injectable, NotFoundException } from '@nestjs/common';
import { BreweriesService } from '../breweries/breweries.service';
import { CreateRatingDto } from '../ratings/dto/create-rating.dto';
import { RatingsService } from '../ratings/ratings.service';
import type { Rating } from '../ratings/ratings.service';
import { CreateBeerDto } from './dto/create-beer.dto';
import { UpdateBeerDto } from './dto/update-beer.dto';

export interface Beer {
  id: number;
  name: string;
  style: string;
  abv: number;
  breweryId: number;
  description?: string;
}

// Antwort mit dem berechneten Feld; gespeichert wird nur Beer
export type BeerWithRating = Beer & { averageRating: number | null };

@Injectable()
export class BeersService {
  constructor(
    private readonly breweriesService: BreweriesService,
    private readonly ratingsService: RatingsService,
  ) {}

  // Daten im Arbeitsspeicher: Nach einem Neustart sind es wieder vier
  private readonly beers: Beer[] = [
    {
      id: 1,
      name: 'Nattheimer Spezial',
      style: 'spezial',
      abv: 5.4,
      breweryId: 1,
    },
    {
      id: 2,
      name: 'Wildbräu Grafing Helles',
      style: 'helles',
      abv: 5.0,
      breweryId: 2,
    },
    {
      id: 3,
      name: 'Augustiner Lagerbier Hell',
      style: 'helles',
      abv: 5.2,
      breweryId: 3,
    },
    {
      id: 4,
      name: 'Farny Kristall-Weizen',
      style: 'weizen',
      abv: 5.3,
      breweryId: 4,
    },
  ];
  private nextId = 5;

  findAll(style?: string): BeerWithRating[] {
    // Ohne ?style= liefert der Endpunkt alle Biere
    const beers = style
      ? this.beers.filter((beer) => beer.style === style)
      : this.beers;
    return beers.map((beer) => this.withRating(beer));
  }

  findOne(id: number): BeerWithRating {
    return this.withRating(this.getBeer(id));
  }

  findByBrewery(breweryId: number): BeerWithRating[] {
    return this.beers
      .filter((beer) => beer.breweryId === breweryId)
      .map((beer) => this.withRating(beer));
  }

  create(dto: CreateBeerDto): BeerWithRating {
    this.assertBreweryExists(dto.breweryId);
    const beer = { id: this.nextId++, ...dto };
    this.beers.push(beer);
    return this.withRating(beer);
  }

  update(id: number, dto: UpdateBeerDto): BeerWithRating {
    const beer = this.getBeer(id);
    // R2 auch beim Ändern, bevor ein Feld überschrieben wird
    if (dto.breweryId !== undefined) {
      this.assertBreweryExists(dto.breweryId);
    }
    // Nur die Felder aus dem Body überschreiben
    Object.assign(beer, dto);
    return this.withRating(beer);
  }

  rate(beerId: number, dto: CreateRatingDto): Rating {
    // Wirft 404, bevor eine Bewertung für ein fehlendes Bier entsteht
    this.getBeer(beerId);
    return this.ratingsService.create(beerId, dto);
  }

  findRatings(beerId: number): Rating[] {
    this.getBeer(beerId);
    return this.ratingsService.findByBeer(beerId);
  }

  // R2: Ein Bier gehört zu genau einer Brauerei;
  // die Brauerei muss existieren.
  // Normal: Brauerei 3 existiert → 201
  // Grenze: Brauerei eben mit POST /breweries angelegt → 201
  // Grenze: breweryId 0 → 404, es gibt keine Brauerei 0
  // Fehler: Brauerei 42 → 404
  // Fehler: breweryId fehlt bei POST → 400 (Schema)
  // Normal: breweryId fehlt bei PATCH → keine Prüfung
  // Lücke: Brauerei gelöscht, ihre Biere bleiben (Fremdschlüssel in Einheit 12)
  private assertBreweryExists(breweryId: number): void {
    // findOne wirft 404, wenn die Brauerei fehlt. 404 statt 400, weil
    // die Anfrage gültig ist und nur die Brauerei nicht existiert
    this.breweriesService.findOne(breweryId);
  }

  // Das gespeicherte Bier: update ändert es, remove entfernt es
  private getBeer(id: number): Beer {
    const beer = this.beers.find((b) => b.id === id);
    if (!beer) {
      throw new NotFoundException(`Beer ${id} not found`);
    }
    return beer;
  }

  // averageRating wird bei jeder Antwort berechnet, nicht gespeichert (R5)
  private withRating(beer: Beer): BeerWithRating {
    return { ...beer, averageRating: this.ratingsService.averageFor(beer.id) };
  }

  remove(id: number): void {
    // getBeer wirft die 404, bevor etwas entfernt wird
    const beer = this.getBeer(id);
    // splice ändert das Array, das findAll liest
    this.beers.splice(this.beers.indexOf(beer), 1);
  }
}
