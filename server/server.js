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

//Create a Todo model
const Todo = mongoose.model("Todo", {
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
});


// const todo1 = new Todo({
//   text: "Play Assassins Creed Origins",
//   completed: false,
//   completedAt: new Date().getFullYear()
// });

// todo1.save().then((document) => {
//   console.log(`Saved Todo: ${JSON.stringify(document, undefined, 2)}`);
// }).catch((error) => {
//   console.log(`Could not save Todo due to: ${error}`);
// });

//Create a User model
const User = mongoose.model("User", {
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  }
});


const user1 = new User({
  email: " elitegreen@gmail.com "
});

user1.save().then((document) => {
  console.log(`Saved the user: ${JSON.stringify(document, undefined, 2)}`);
}).catch((error) => {
  console.log(`Could not save user due to: ${error}`);
});