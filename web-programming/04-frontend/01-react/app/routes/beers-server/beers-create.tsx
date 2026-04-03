import { Form } from "react-router";

export async function clientAction({ request }) {
  const formData = await request.formData();
  const name = formData.get("name");

  const response = await fetch("http://localhost:3000/v2/beers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });

  const beer = await response.json();
  return beer;
}

export default function BeersCreate({ actionData }) {
  return (
    <>
      <h1>Create beer</h1>
      <Form method="post">
        <input type="text" name="name" />
        <button type="submit">Create</button>
      </Form>
      {actionData ? <p>Created beer: {actionData.name}</p> : null}
    </>
  );
}
