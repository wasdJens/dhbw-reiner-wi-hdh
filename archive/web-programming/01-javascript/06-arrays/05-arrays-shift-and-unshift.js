const cars = ['Mercedes', 'BMW', 'Audi', 'Volkswagen']
console.log('Before: ', cars);

cars.unshift('Volvo');
console.log('Added Volvo as first Element: ', cars);

cars.shift();
console.log('Removed first Element', cars)