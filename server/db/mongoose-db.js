const mongoose = require("mongoose");

const myTODOAppDB = "TODOApp";
const url = `mongodb://localhost:27017/${myTODOAppDB}`;

mongoose.Promise = global.Promise;
mongoose.connect(url)
.then(() => {
  console.log("Mongoose connected to MongoDB");
})
.catch((error) => {
  console.log(`Mongoose could not connect to MongoDB due to: ${error}`);
});

module.exports = {
  mongoose
}