import { Beer } from '../entities/beer.entity';

export class BeerResponseDto {
  id: number;
  name: string;
  brand: string;
  taste: string;
  amount: number;
  rating: number;

  constructor(beer: Beer) {
    this.id = beer.id;
    this.name = beer.name;
    this.brand = beer.brand;
    this.taste = beer.taste;
    this.amount = beer.amount;
    this.rating = beer.rating;
  }
}
