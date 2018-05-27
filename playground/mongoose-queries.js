const {mongoose} = require("./../server/db/mongoose-db");
const {Todo} = require("./../server/model/Todo-model");
const {User} = require("./../server/model/User-model");
const {ObjectID} = require("mongodb");

const todoId = "5b0a79cace999e7f192f0260";
const userId = "5b0a7e99f32281760752e810";

// Todo.find(
//   {
//     _id: todoId
//   }
// ).then((todos) => {
//   console.log("Todos by Id",todos);
// }).catch((error) => {
//   console.log(error);
// });

// Todo.findOne(
//   {
//     _id: todoId
//   }
// ).then((todo) => {
//   console.log("Todo by Id", todo);
// }).catch((error) => {
//   console.log(error);
// });

if (!ObjectID.isValid(todoId)) {
  console.log("Todo Id not valid");
}



// Todo.findById(todoId).then((todo) => {
//   if(!todo) {
//     return console.log("Id not found");
//   }
//   console.log("Todo by Id",todo);
// }).catch((error) => {
//   console.log(error);
// });

if(!ObjectID.isValid(userId)) {
  console.log("User Id not valid");
}

User.find(
  {
    _id:userId
  }
).then((users) => {
  console.log("Users by id",users);
}).catch((error) => {
  console.log(error);
});

User.findOne(
  {
    _id: userId
  }
).then((user) => {
  console.log("User by Id",user);
}).catch((error) => {
  console.log(error);
});


User.findById(userId)
.then((user) => {
  console.log("User by Id",user);
}).catch((error) => {
  console.log(error);
});