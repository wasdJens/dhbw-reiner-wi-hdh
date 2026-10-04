// JSX sieht aus wie HTML, ist aber JavaScript

// Das hier...
const element = <h1 className="title">Hallo Welt</h1>;

// ...wird zu diesem JavaScript:
const element = React.createElement("h1", { className: "title" }, "Hallo Welt");

// JSX kann JavaScript-Ausdrücke enthalten:
const name = "Maria";
const greeting = <h1>Hallo {name}!</h1>;
//                      ↑ geschweifte Klammern = JavaScript-Ausdruck

// Bedingtes Rendering:
const status = <p>{inStock ? "Auf Lager" : "Nicht verfügbar"}</p>;

// Listen rendern:
const list = (
  <ul>
    {products.map((p) => (
      <li key={p.id}>
        {p.name} – {p.price}€
      </li>
    ))}
  </ul>
);
