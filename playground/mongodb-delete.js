const {MongoClient, ObjectID} = require("mongodb")

const myTODOAppDB = "TODOApp";
const myTODOAppMyTODOsCollection = "MyTODOs";
const myTODOAppUsersCollection = "MyUsers";

const url = "mongodb://localhost:27017";

MongoClient.connect(url,(error, client) => {
  if(error) {
    return console.log(`Could not connect to MongoDB due to: ${error}`);
  }
  console.log("Connected to MongoDB...");

  const db = client.db(myTODOAppDB);

  // Delete many documents
  db.collection(myTODOAppMyTODOsCollection).deleteMany({
    text: "Walk the dog"
  }).then((result) => {
    console.log(JSON.stringify(result, undefined, 2));
  }).catch((error) => {
    console.log(`Could not delete documents from MongoDB due to: ${error}`);
  });

  // Delete one document
  db.collection(myTODOAppMyTODOsCollection).deleteOne({
    text: "Learn Node.JS fast"
  }).then((result) => {
    console.log(JSON.stringify(result, undefined, 2));
  }).catch((error) => {
    console.log(`Could not delete one document from MongoDB due to: ${error}`);
  });

  // Find one document and delete
  db.collection(myTODOAppMyTODOsCollection).findOneAndDelete({
    completed: false
  }).then((document) => {
    console.log(`Deleted document: ${JSON.stringify(document, undefined, 2)}`);
  }).catch((error) => {
    console.log(`Could not find one document and delete due to: ${error}`);
  });

  //Find one document and delete.
  db.collection(myTODOAppUsersCollection).findOneAndDelete({
    name: "Vesemyr"
  }).then((document) => {
    console.log(`Deleted document: ${JSON.stringify(document, undefined, 2)}`);
  }).catch((error) => {
    console.log(`Could not find one document and delete from MongoDB due to: ${error}`);
  });

  //Delete one document
  db.collection(myTODOAppUsersCollection).deleteOne({
    _id: new ObjectID("5b02e7e75f6b1714d5ea087c")
  }).then((result) => {
    console.log(JSON.stringify(result, undefined, 2));
  }).catch((error) => {
    console.log(`Could not delete one document from MongoDB due to: ${error}`);
  })

  // client.close();
});