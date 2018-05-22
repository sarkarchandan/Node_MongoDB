const {MongoClient, ObjectID} = require("mongodb");

const myTODOAppDB = "TODOApp";
const myTODOAppMyTODOsCollection = "MyTODOs";
const myTODOAppUsersCollection = "MyUsers";

const url = "mongodb://localhost:27017";

MongoClient.connect(url, (error, client) => {
  if(error) {
    return console.log(`Could not connect to MongoDB due to: ${error}`);
  }

  console.log("Connected to MongoDB...");

  const db = client.db(myTODOAppDB);

  //Find one document and update.
  db.collection(myTODOAppMyTODOsCollection).findOneAndUpdate({
    _id: new ObjectID("5b044526591bae97740dbdf9")
  },{
    $set: {
      completed: true
    }
  },{
    returnOriginal: false
  }).then((document) => {
    console.log(`Updated document: ${JSON.stringify(document, undefined, 2)}`);
  }).catch((error) =>{
    console.log(`Could not find one document and udpate in MongoDB due to: ${error}`);
  })

  //Find one document and update multiple properties
  db.collection(myTODOAppUsersCollection).findOneAndUpdate({
    _id: new ObjectID("5b02fa9b79d3d0178ae63a88")
  },{
    $set: {
      name: "Pelar"
    },
    $inc: {
      age: 5
    }
  },{
    returnOriginal: false
  }).then((document) => {
    console.log(`Updated document: ${JSON.stringify(document, undefined, 2)}`);
  }).catch((error) => {
    console.log(`Could not find one document and update in MongoDB due to: ${error}`);
  })

  // client.close();
});