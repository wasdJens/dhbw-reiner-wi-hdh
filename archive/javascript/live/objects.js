const cars = [
  {
    price: 15000,
    name: "BYD Irgendwas",
    power: 200,
    color: "green",
    isCheap: true,
  },
  {
    price: 70000,
    name: "Audi A4",
    power: 200,
    color: "green",
    isCheap: false,
  },
  {
    price: 320000,
    name: "Porsche GT3 RS",
    power: 600,
    color: "green",
    isCheap: false,
  },
];

const isCheapest = cars.filter((car) => car.price <= 20000);
console.log(isCheapest);
