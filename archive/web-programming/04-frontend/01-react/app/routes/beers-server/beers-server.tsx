export async function clientLoader() {
  const response = await fetch("http://localhost:3000/v2/beers");
  const beers = await response.json();
  return beers;
}

export default function BeersServer({ loaderData }) {
  const beers: Array<{ name: string }> = loaderData;
  return (
    <>
      <h1>Beers from Server</h1>
      <ul>
        {beers.map((beer, index) => (
          <li key={index}>{beer.name}</li>
        ))}
      </ul>
    </>
  );
}
