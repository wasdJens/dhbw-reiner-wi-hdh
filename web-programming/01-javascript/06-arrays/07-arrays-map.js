const cars = ['Mercedes', 'BMW', 'Audi', 'Volkswagen']

const carsAsObjects = cars.map((car) => {
  const carObj = {
    manufacturer: car,
    isCheap: false,
  }
  return carObj;
})

console.log('List of Cars but as objects: ', carsAsObjects);