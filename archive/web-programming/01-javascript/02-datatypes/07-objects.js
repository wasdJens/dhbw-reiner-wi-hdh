const phone = {
  manufacturer: "Apple",
  model: "iPhone",
  storage: 128,
  isReleased: false,
};

console.log(phone);

console.log('Phone Model: ', phone.model);

phone.price = 1400;
console.log('New Price Property: ', phone);

phone.isReleased = true;
console.log('Now the phone is released: ', phone);

delete phone.storage;
console.log('Now the phone has no more storage property', phone);