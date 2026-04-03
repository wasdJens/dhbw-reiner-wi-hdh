interface Car {
  name: string;
  brand: string;
  year: number;
  ev: boolean;
  affordable: boolean;
}

type CarArray = Array<Car>; 