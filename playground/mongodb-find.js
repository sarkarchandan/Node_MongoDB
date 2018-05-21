const {MongoClient, ObjectID} = require("mongodb");

const myTODOAppDB = "TODOApp";
const myTODOAppMyTODOsCollection = "MyTODOs";
const myTODOAppUsersCollection = "MyUsers";

const url = "mongodb://localhost:27017";

MongoClient.connect(url, (error, client) => {
  if(error) {
    return console.log(`Could not connect mongodb due to: ${error}`);
  }
  console.log("Connected to mongodb");

  const db = client.db(myTODOAppDB);

  db.collection(myTODOAppMyTODOsCollection).find().toArray().then((documents) => {
    console.log("Fetching All TODOs...");
    console.log(JSON.stringify(documents, undefined, 2));
  }).catch((error) => {
    console.log(`Fetch form mongodb failed with: ${error}`);
  });

  db.collection(myTODOAppMyTODOsCollection).find({
    completed: false
  }).toArray()
  .then((documents) => {
    console.log("Fetching TODOs which are not completed...");
    console.log(JSON.stringify(documents, undefined, 2));
  }).catch((error) => {
    console.log(`Could not fethc data due to: ${error}`);
  });

  db.collection(myTODOAppUsersCollection).find(
    {
      _id: new ObjectID("5b02e7e75f6b1714d5ea087c")
    }
  ).toArray()
  .then((documents) => {
    console.log("Fetching User by ObjectID");
    console.log(JSON.stringify(documents, undefined, 2));
  }).catch((error) => {
    console.log(`Could not fetch from mongodb due to: ${error}`);
  });
  
  db.collection(myTODOAppUsersCollection).count().then((count) => {
    console.log("Fetching total users count...");
    console.log(`Total User Count: ${count}`);
  }).catch((error) => {
    console.log(`Could not fetch from mongodb due to: ${error}`);
  })

  db.collection(myTODOAppUsersCollection).find(
    {
      name: "Vesemyr"
    }
  ).toArray()
  .then((users) => {
    console.log("Fetching all users with the name Vesemyr...");
    console.log(JSON.stringify(users, undefined, 2));
  }).catch((error) => {
    console.log(`Could not fetch from mongodb due to: ${error}`);
  });

  // client.close();
});