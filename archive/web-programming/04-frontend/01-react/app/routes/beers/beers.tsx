import { Link, Outlet } from "react-router";

export default function Beers() {
  const beers = [
    {
      name: "Nattheimer",
      id: 1,
    },
  ];

  return (
    <>
      <h1>Beers</h1>
      <ul>
        {beers.map((beer) => (
          <li key={beer.id}>
            <Link to={`${beer.id}`}>{beer.name}</Link>
          </li>
        ))}
      </ul>
      <Outlet></Outlet>
    </>
  );
}
