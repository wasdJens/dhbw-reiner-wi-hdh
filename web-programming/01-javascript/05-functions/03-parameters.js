function addPrefix(input, prefix = 'id: ') {
  return `${prefix} ${input}`;
}

console.log(addPrefix('Test'));
console.log(addPrefix('iPhone', 'Pro Max'));
