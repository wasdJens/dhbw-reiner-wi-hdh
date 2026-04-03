const cars = ['Mercedes', 'BMW', 'Audi', 'Volkswagen']

const isPartOfVolkswagen = cars.filter((car) => car === 'Audi' || car === 'Volkswagen');
console.log(isPartOfVolkswagen);