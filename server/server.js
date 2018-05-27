const express = require("express");
const bodyParser = require("body-parser");
const {mongoose} = require("./db/mongoose-db");
const {Todo} = require("./model/Todo-model");
const {User} = require("./model/User-model");
const {ObjectID} = require("mongodb");

const app = express();

//Setting Middleware
app.use(bodyParser.json());

//POST /todos
app.post("/todos", (request, response) => {
  const todo = new Todo({
    text: request.body.text
  });
  todo.save()
  .then((document) => {
    response.send(document);
  }).catch((error) => {
    response.status(400).send(error);
  });
});

//GET /todos/
app.get("/todos", (request, response) => {

  Todo.find().then((todos) => {
    response.send({todos});
  }).catch((error) => {
    response.status(400).send(error);
  });

});

//GET /todos/{id}
app.get("/todos/:id", (request,response) => {

  const {id} = request.params
  
  if(!ObjectID.isValid(id)) {
    return response.status(404).send({
      message: "Invalid ID"
    })
  }

  Todo.findById(id)
  .then((todo) => {
    if(!todo) {
      return response.status(404).send();
    }
    response.status(200).send(todo);
  }).catch((error) => {
    response.status(400).send(error);
  });
});

if(!module.parent) {
  app.listen(3000, () => {
    console.log("Server started on port 3000");
  });
}

module.exports = {
  app
}