const express = require("express");
const lodash = require("lodash");
const bodyParser = require("body-parser");
const {mongoose} = require("./db/mongoose-db");
const {Todo} = require("./model/Todo-model");
const {User} = require("./model/User-model");
const {ObjectID} = require("mongodb");

const app = express();

const port = process.env.PORT || 3000;

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

//DELETE /todos/:id
app.delete("/todos/:id", (request, response) => {

  const {id} = request.params;

  if(!ObjectID.isValid(id)) {
    return response.status(404).send(
      {
        message: "Invalid ID"
      }
    );
  }

  Todo.findByIdAndRemove(id)
  .then((todo) => {
    if(!todo) {
      return response.status(404).send();
    }
    return response.status(200).send(todo);
  })
  .catch((error) => {
    response.status(400).send(error);
  });

});


app.patch("/todos/:id", (request, response) => {

  const {id} = request.params;
  const body = lodash.pick(request.body, ["text","completed"]);

  // console.log("Completed", completed);

  if(!ObjectID.isValid(id)) {
    return response.status(404).send(
      {
        message: "Invalid ID"
      }
    );
  }

  if(lodash.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  }else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id,
  { $set: body },
  { new: true })
  .then((todo) => {
    if(!todo) {
      return response.status(404).send();
    }
    response.send(todo);
  }).catch((error) => {
    response.status(400).send(error);
  });
});


if(!module.parent) {
  app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`);
  });
}

module.exports = {
  app
}