const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
  console.log("Mongoose connected to MongoDB");
})
.catch((error) => {
  console.log(`Mongoose could not connect to MongoDB due to: ${error}`);
});

module.exports = {
  mongoose
}