import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBeerDto } from './dto/create-beer.dto';
import { UpdateBeerDto } from './dto/update-beer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Beer } from './entities/beer.entity';
import { Repository } from 'typeorm';
import { BeerResponseDto } from './dto/beer-response.dto';

@Injectable()
export class BeersService {
  constructor(
    /**
     * Get access to the beers repository for database operations
     */
    @InjectRepository(Beer) private beersRepository: Repository<Beer>,
  ) {}

  /**
   * Takes a provided DTO from the controller and creates a new beer entity in the database.
   * @param createBeerDto The DTO containing the beer data to create including name, brand, and taste.
   * @returns The created beer as a BeerResponseDto instance
   */
  async create(createBeerDto: CreateBeerDto): Promise<BeerResponseDto> {
    const beer = this.beersRepository.create({
      name: createBeerDto.name,
      brand: createBeerDto.brand,
      taste: createBeerDto.taste,
    });

    await this.beersRepository.save(beer);

    return new BeerResponseDto(beer);
  }

  /**
   * Retrieves all beer entities from the database and returns them as an array of BeerResponseDto instances.
   * @returns An array of BeerResponseDto instances representing all beers in the database.
   */
  async findAll(): Promise<BeerResponseDto[]> {
    const beers = await this.beersRepository.find();
    return beers.map((beer) => new BeerResponseDto(beer));
  }

  /**
   * Retrieves a single beer entity by its ID and returns it as a BeerResponseDto instance.
   * If the beer is not found, throws a NotFoundException (404 error)
   * @param id The ID of the beer to retrieve.
   * @returns A BeerResponseDto instance representing the found beer.
   */
  async findOne(id: number): Promise<BeerResponseDto | null> {
    const beer = await this.beersRepository.findOneBy({ id });
    if (!beer) {
      throw new NotFoundException(`Beer with ID ${id} not found`);
    }
    return new BeerResponseDto(beer);
  }

  /**
   * Updates an existing beer entity with the provided data from the UpdateBeerDto.
   * If the beer is not found, throws a NotFoundException (404 error)
   * @param id The ID of the beer to update.
   * @param updateBeerDto The DTO containing the updated beer data.
   * @returns A BeerResponseDto instance representing the updated beer.
   */
  async update(
    id: number,
    updateBeerDto: UpdateBeerDto,
  ): Promise<BeerResponseDto> {
    const beer = await this.beersRepository.findOneBy({ id });
    if (!beer) {
      throw new NotFoundException(`Beer with ID ${id} not found`);
    }

    beer.name = updateBeerDto.name ?? beer.name;
    beer.brand = updateBeerDto.brand ?? beer.brand;
    beer.taste = updateBeerDto.taste ?? beer.taste;
    beer.amount = updateBeerDto.amount ?? beer.amount;
    beer.rating = updateBeerDto.rating ?? beer.rating;

    await this.beersRepository.save(beer);

    return new BeerResponseDto(beer);
  }

  /**
   * Deletes a beer entity by its ID.
   * If the beer does not exist it simply does nothing (Default TypeORM behavior)
   * @param id The ID of the beer to delete.
   */
  async remove(id: number) {
    await this.beersRepository.delete(id);
  }
}
