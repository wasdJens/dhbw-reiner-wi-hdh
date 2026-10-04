import { PartialType } from '@nestjs/mapped-types';
import { CreateBeerDto } from './create-beer.dto';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class UpdateBeerDto extends PartialType(CreateBeerDto) {
  @IsInt()
  @IsOptional()
  amount?: number;

  @IsInt()
  @Min(1)
  @Max(5)
  @IsOptional()
  rating?: number;
}
