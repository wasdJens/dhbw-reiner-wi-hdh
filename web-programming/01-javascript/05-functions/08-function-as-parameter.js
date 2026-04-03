const upperCase = (input) => input.toUpperCase();
const replaceWithEmoji = (str) => {
  const emojis = ['😀', '😂', '😍', '😎', '🤔', '🥳', '😱', '😴', '🤖', '👽'];
  
  return str.split('').map(char => {
    if (/[a-zA-Z]/.test(char)) {
      return emojis[Math.floor(Math.random() * emojis.length)];
    } else {
      return char;
    }
  }).join('');
};

const phone = {
  model: 'iPhone Pro Max',
  printModel(transformFn) {
    return transformFn(this.model);
  }
}

console.log(phone.printModel(upperCase));
console.log(phone.printModel(replaceWithEmoji));