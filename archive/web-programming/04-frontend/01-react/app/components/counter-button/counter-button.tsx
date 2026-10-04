export default function IncrementButton({
  increment: increment,
}: {
  increment: () => void;
}) {
  return <button onClick={increment}>Increment</button>;
}
