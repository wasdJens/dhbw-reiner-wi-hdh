export interface BeerResponseDto {
  id: number;
  name: string;
  brand: string;
  taste: string;
  amount: number;
  rating: number;
}

export interface BeerCreateDto {
  name: string;
  brand: string;
  taste: string;
}

export interface UpdateBeerDto {
  name?: string;
  brand?: string;
  taste?: string;
  amount?: number;
  rating?: number;
}
