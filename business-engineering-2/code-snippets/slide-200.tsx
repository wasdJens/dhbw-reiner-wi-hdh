// Deklarativ (React): Beschreibe WAS
function Counter() {
  return (
    <div>
      <span>{count}</span>
      <button disabled={count >= 10}>+1</button>
      {count >= 10 && <p>Maximum erreicht!</p>}
    </div>
  );
}
// React berechnet die Änderungen automatisch.
// Vergessen unmöglich.
