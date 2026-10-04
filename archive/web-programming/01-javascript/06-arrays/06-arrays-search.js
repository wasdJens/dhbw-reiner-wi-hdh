const cars = ['Mercedes', 'BMW', 'Audi', 'Volkswagen']

const hasMercedes = cars.includes('Mercedes');
console.log('Has cars a mercedes: ', hasMercedes);

const indexOfAudi = cars.indexOf('Audi');
console.log('Audi is at index: ', indexOfAudi);

const volkswagen = cars.find((car) => car === 'Volkswagen');
console.log('Volkswagen Element: ', volkswagen);