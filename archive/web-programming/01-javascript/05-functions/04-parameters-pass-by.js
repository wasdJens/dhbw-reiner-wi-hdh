function updatePhone(phone) {
  phone.year = '2024';
}

const phone = {
  maker: 'Apple',
  model: 'iPhone',
  year: '2023'
}

console.log('Phone Year before: ', phone.year);
updatePhone(phone);
console.log('Phone Year afterwards: ', phone.year);