const cars = ['Mercedes', 'BMW', 'Audi', 'Volkswagen', { manufacturer: 'Volvo', model: 'Polestar'}];

const allCarsAreStrings = cars.every((car) => typeof car === 'string');
console.log('Are all cars of type string? ', allCarsAreStrings);

const hasAudi = cars.some((car) => car === 'Audi');
console.log('Is some car an audi? ', hasAudi);