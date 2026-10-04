function square(number) {
  return number * number;
} 

// Real Function -> Invoked via a function call
const realFunctionResult = square(5);
console.log(realFunctionResult);

const obj = { squareMethod: square};

// Method Function -> Stored as a property inside an object and invoked as a method
const methodFunctionResult = obj.squareMethod(5);
console.log(methodFunctionResult);

const constructorFunctionResult = new square();
console.log(constructorFunctionResult)