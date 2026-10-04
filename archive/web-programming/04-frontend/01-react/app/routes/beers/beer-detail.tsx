export async function loader({ params }: { params: { beerId: string } }) {
  const beer = { name: "Nattheimer", id: params.beerId };
  return beer;
}

export default function BeerDetail({
  loaderData,
}: {
  loaderData: { id: string; name: string };
}) {
  return (
    <>
      <h1>Beer Detail</h1>
      <p> {loaderData.id} </p>
    </>
  );
}
