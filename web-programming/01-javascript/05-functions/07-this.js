const obj = {
  square(number) {
    console.log(this);
    return number * number;
  }
}

obj.square(5);

function square(number) {
  console.log(this);
  return number * number;
}

square(5);
