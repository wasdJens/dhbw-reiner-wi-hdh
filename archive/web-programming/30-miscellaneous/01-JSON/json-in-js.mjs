const user = {
  "users": [
    {
      "name": "Jens Reiner",
      "age": 28,
      "roles": ["READ", "UPDATE", "DELETE", "CREATE"]
    }
  ],
  "version": "2.4.5",
  "softwareName": "DHBW Sample",
  "active": true
};

const userAsJson = JSON.stringify(user);
console.log('User as json: ', userAsJson);

const userAsObject = JSON.parse(userAsJson);
console.log('User as object: ', userAsObject);