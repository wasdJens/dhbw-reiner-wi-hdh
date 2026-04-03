import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateBeerDto {
  @IsString()
  name: string;

  @IsNumber()
  @IsOptional()
  price: number;
}
