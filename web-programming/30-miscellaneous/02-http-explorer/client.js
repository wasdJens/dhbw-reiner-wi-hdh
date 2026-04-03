const BASE_URL = "http://localhost:8080";

const ping = async () => {
  const request = await fetch(`${BASE_URL}/ping`, {
    method: "POST",
  });
  const response = await request.json();

  console.log("Server Response: ", response);
};

ping();
