import { IsString } from 'class-validator';

export class CreateBeerDto {
  @IsString()
  name: string;

  @IsString()
  brand: string;

  @IsString()
  taste: string;
}
