import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { BreweriesService } from '../breweries/breweries.service';
import { CreateRatingDto } from '../ratings/dto/create-rating.dto';
import { Rating } from '../ratings/rating.entity';
import { RatingsService } from '../ratings/ratings.service';
import { Beer } from './beer.entity';
import { BeerQueryDto } from './dto/beer-query.dto';
import { CreateBeerDto } from './dto/create-beer.dto';
import { UpdateBeerDto } from './dto/update-beer.dto';

// Antwort mit dem berechneten Feld; gespeichert wird nur Beer
export type BeerWithRating = Beer & { averageRating: number | null };

// null steht immer am Ende; direction kehrt nur die Reihenfolge der Werte um
function compareNullLast(
  a: string | number | null,
  b: string | number | null,
  direction: number,
): number {
  if (a === null || b === null) {
    return a === b ? 0 : a === null ? 1 : -1;
  }
  const result =
    typeof a === 'string' ? a.localeCompare(String(b)) : a - Number(b);
  return result * direction;
}

@Injectable()
export class BeersService {
  // Daten in beer.db: Ein Neustart ändert nichts
  constructor(
    @InjectRepository(Beer)
    private readonly beersRepository: Repository<Beer>,
    private readonly breweriesService: BreweriesService,
    private readonly ratingsService: RatingsService,
  ) {}

  // Filter: Jeder Filter verkleinert die Liste.
  // Normal: ?style=weizen → nur das Farny Kristall-Weizen
  // Normal: ?breweryId=2 → nur das Wildbräu Grafing Helles
  // Normal: ?style=helles&breweryId=3 → nur das Augustiner Lagerbier Hell
  // Grenze: Filter ohne Treffer → 200 mit []
  // Fehler: ?style=lager oder ?sort=price → 400 (Schema)
  // Sortierung: ?sort=averageRating&order=desc → absteigend
  // Grenze: Biere ohne Bewertung (null) stehen am Ende, auch bei desc
  async findAll(query: BeerQueryDto): Promise<BeerWithRating[]> {
    // undefined im where wirft in TypeORM 1: nur gesetzte Filter übergeben
    const where: FindOptionsWhere<Beer> = {};
    if (query.style) {
      where.style = query.style;
    }
    if (query.breweryId !== undefined) {
      where.breweryId = query.breweryId;
    }
    // relations: Die Brauerei kommt mit, für den Namen in der HTML-Tabelle
    const beers = await this.withRatings(
      await this.beersRepository.find({ where, relations: { brewery: true } }),
    );
    // averageRating steht nicht in der Tabelle: Sortierung im Service
    if (query.sort) {
      const field = query.sort;
      const direction = query.order === 'desc' ? -1 : 1;
      beers.sort((a, b) => compareNullLast(a[field], b[field], direction));
    }
    return beers;
  }

  async findOne(id: number): Promise<BeerWithRating> {
    return this.withRating(await this.getBeer(id));
  }

  async findByBrewery(breweryId: number): Promise<BeerWithRating[]> {
    return this.withRatings(await this.beersRepository.findBy({ breweryId }));
  }

  async create(dto: CreateBeerDto): Promise<BeerWithRating> {
    await this.assertBreweryExists(dto.breweryId);
    const beer = await this.beersRepository.save(
      this.beersRepository.create(dto),
    );
    return this.withRating(beer);
  }

  async update(id: number, dto: UpdateBeerDto): Promise<BeerWithRating> {
    const beer = await this.getBeer(id);
    // R2 auch beim Ändern, bevor ein Feld überschrieben wird
    if (dto.breweryId !== undefined) {
      await this.assertBreweryExists(dto.breweryId);
    }
    // Nur die Felder aus dem Body überschreiben
    Object.assign(beer, dto);
    return this.withRating(await this.beersRepository.save(beer));
  }

  async rate(
    beerId: number,
    userId: number,
    dto: CreateRatingDto,
  ): Promise<Rating> {
    // Wirft 404, bevor eine Bewertung für ein fehlendes Bier entsteht
    await this.getBeer(beerId);
    return this.ratingsService.create(beerId, userId, dto);
  }

  async findRatings(beerId: number): Promise<Rating[]> {
    await this.getBeer(beerId);
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
  // Geschlossen: Brauerei mit Bieren löschen → Fremdschlüssel lehnt ab
  private async assertBreweryExists(breweryId: number): Promise<void> {
    // findOne wirft 404, wenn die Brauerei fehlt. 404 statt 400, weil
    // die Anfrage gültig ist und nur die Brauerei nicht existiert.
    // await: findOne liest aus der Datenbank und liefert ein Promise
    await this.breweriesService.findOne(breweryId);
  }

  private async getBeer(id: number): Promise<Beer> {
    const beer = await this.beersRepository.findOneBy({ id });
    if (!beer) {
      throw new NotFoundException(`Beer ${id} not found`);
    }
    return beer;
  }

  // averageRating wird bei jeder Antwort berechnet, nicht gespeichert (R5)
  private async withRating(beer: Beer): Promise<BeerWithRating> {
    return {
      ...beer,
      averageRating: await this.ratingsService.averageFor(beer.id),
    };
  }

  private withRatings(beers: Beer[]): Promise<BeerWithRating[]> {
    return Promise.all(beers.map((beer) => this.withRating(beer)));
  }

  async remove(id: number): Promise<void> {
    // getBeer wirft die 404, bevor etwas entfernt wird
    const beer = await this.getBeer(id);
    await this.beersRepository.remove(beer);
  }
}
