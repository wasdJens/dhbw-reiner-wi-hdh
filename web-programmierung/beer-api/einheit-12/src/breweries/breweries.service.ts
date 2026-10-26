import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { Brewery } from './brewery.entity';
import { BreweryQueryDto } from './dto/brewery-query.dto';
import { CreateBreweryDto } from './dto/create-brewery.dto';
import { UpdateBreweryDto } from './dto/update-brewery.dto';

@Injectable()
export class BreweriesService {
  // Daten in beer.db: Ein Neustart ändert nichts
  constructor(
    @InjectRepository(Brewery)
    private readonly breweriesRepository: Repository<Brewery>,
  ) {}

  findAll(query: BreweryQueryDto): Promise<Brewery[]> {
    // undefined im where wirft in TypeORM 1: nur gesetzte Filter übergeben
    return this.breweriesRepository.find({
      where: query.city ? { city: query.city } : {},
      order: query.sort ? { [query.sort]: query.order } : {},
    });
  }

  async findOne(id: number): Promise<Brewery> {
    const brewery = await this.breweriesRepository.findOneBy({ id });
    if (!brewery) {
      // Jeder Aufrufer bekommt dieselbe 404
      throw new NotFoundException(`Brewery ${id} not found`);
    }
    return brewery;
  }

  create(dto: CreateBreweryDto): Promise<Brewery> {
    // Ohne id fügt save eine Zeile ein; die Datenbank vergibt die id
    return this.breweriesRepository.save(dto);
  }

  async update(id: number, dto: UpdateBreweryDto): Promise<Brewery> {
    const brewery = await this.findOne(id);
    // Nur die Felder aus dem Body überschreiben
    Object.assign(brewery, dto);
    // Mit id ändert save die vorhandene Zeile
    return this.breweriesRepository.save(brewery);
  }

  async remove(id: number): Promise<void> {
    const brewery = await this.findOne(id);
    try {
      await this.breweriesRepository.remove(brewery);
    } catch (error) {
      // Der Fremdschlüssel lehnt ab: Zur Brauerei gehören noch Biere (R2).
      // 409, weil der Zustand der Ressource die Anfrage verhindert
      if (
        error instanceof QueryFailedError &&
        error.message.includes('FOREIGN KEY')
      ) {
        throw new ConflictException(`Brewery ${id} still has beers`);
      }
      throw error;
    }
  }
}
