import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { BreweriesGateway } from './breweries.gateway';
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
    // Das Gateway injiziert den Service: forwardRef auf beiden Seiten
    @Inject(forwardRef(() => BreweriesGateway))
    private readonly breweriesGateway: BreweriesGateway,
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

  async create(dto: CreateBreweryDto): Promise<Brewery> {
    // Ohne id fügt save eine Zeile ein; die Datenbank vergibt die id
    const brewery = await this.breweriesRepository.save(dto);
    // Event an alle verbundenen Clients, erst nach dem Speichern
    this.breweriesGateway.server.emit('breweryCreated', brewery);
    return brewery;
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
