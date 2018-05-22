// const MongoClient = require("mongodb").MongoClient;
const {MongoClient, ObjectID} = require("mongodb");

const myTODOAppDB = "TODOApp";
const myTODOAppMyTODOsCollection = "MyTODOs";
const myTODOAppUsersCollection = "MyUsers";

const url = "mongodb://localhost:27017";

MongoClient.connect(url,(error, client) => {
  if(error) {
    return console.log(`Unable to connect mongo database server: ${error}`);
  }
  console.log("Connected to the mongo database server.");
  const db = client.db(myTODOAppDB);

  //Inserting one document to certain collection
  db.collection(myTODOAppMyTODOsCollection).insertOne({
    text: "Play Assassin's Creed Syndicate",
    completed: true
  }, (error, result) => {
    if(error) {
      return console.log(`Unable to insert todo due to: ${error}`);
    }
    console.log(JSON.stringify(result.ops, undefined, 2));
  });

  db.collection(myTODOAppUsersCollection).insertOne({
    name: "Vesemyr",
    age: 70,
    location: "Vizima"
  }, (error, result) => {
    if(error) {
      return console.log(`Unable to insert user due to: ${error}`);
    }
    console.log(JSON.stringify(result.ops, undefined, 2));
    console.log(result.ops[0]._id.getTimestamp());
  });

  client.close();
});