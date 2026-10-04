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

const API_URL = "http://localhost:3000/api/v1/beers";

async function toJson<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Beer API request failed.");
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

export async function getAllBeers(): Promise<BeerResponseDto[]> {
  const response = await fetch(API_URL, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });
  return toJson<BeerResponseDto[]>(response);
}

export async function getBeerById(id: number): Promise<BeerResponseDto> {
  const response = await fetch(`${API_URL}/${id}`, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });
  return toJson<BeerResponseDto>(response);
}

export async function createBeer(payload: BeerCreateDto): Promise<BeerResponseDto> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  return toJson<BeerResponseDto>(response);
}

export async function updateBeer(id: number, payload: UpdateBeerDto): Promise<BeerResponseDto> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  return toJson<BeerResponseDto>(response);
}

export async function deleteBeer(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  await toJson<void>(response);
}
