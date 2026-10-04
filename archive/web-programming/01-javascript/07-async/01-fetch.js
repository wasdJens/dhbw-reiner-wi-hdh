const fetchPromise = fetch('http://localhost:3000/');

console.log(fetchPromise);

fetchPromise.then((response) => {
  console.log(`Received response: ${response.status}`)
})

console.log('Fetch Sample');