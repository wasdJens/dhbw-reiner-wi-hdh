import { Exclude } from 'class-transformer';
import { BeerDto } from './beer.dto';

export class Beer {
  name: string;
  secretRecipe?: string;

  constructor(beer: BeerDto) {
    this.name = beer.name;
  }
}
