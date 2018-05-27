const {mongoose} = require("./../server/db/mongoose-db");
const {ObjectID} = require("mongodb");
const {Todo} = require("./../server/model/Todo-model");


//Todo remove
// Todo.remove({})
// .then((result) => {
//   console.log(result);
// }).catch((error) => {
//   console.log(error);
// });

// Todo.findByIdAndRemove("5b0ab2056b1571902491aa59")
// .then((todo) => {
//   console.log(todo);
// })
// .catch((error) => {
//   console.log(error);
// })

Todo.findOneAndRemove(
  {
    _id: "5b0ab21c6b1571902491aa5b"
  }
)
.then((todo) => {
  console.log(todo);
})
.catch((error) => {
  console.log(error);
});

