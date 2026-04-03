import { useState } from "react";
import IncrementButton from "../counter-button/counter-button";

export default function Counter() {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount((c) => c + 1);
  };

  const handleReset = () => {
    setCount(0);
  };

  return (
    <>
      <h1>Counter: {count}</h1>
      <IncrementButton increment={handleIncrement}></IncrementButton>
      <button onClick={handleReset}>Reset</button>
    </>
  );
}
