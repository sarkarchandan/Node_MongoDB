const express = require("express");
const bodyParser = require("body-parser");
const {mongoose} = require("./db/mongoose-db");
const {Todo} = require("./model/Todo-model");
const {User} = require("./model/User-model");


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

//GET /todos/ , /todos/{id}

app.listen(3000, () => {
  console.log("Server started on port 3000");
});