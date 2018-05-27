const mongoose = require("mongoose");

const myTODOAppDB = "TODOApp";
// const url = `mongodb://localhost:27017/${myTODOAppDB}`;

const url = `mongodb://${encodeURIComponent("sarkar1986.chandan")}:${encodeURIComponent("Corleonevgl#86")}@ds237620.mlab.com:37620/todoappdb`

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