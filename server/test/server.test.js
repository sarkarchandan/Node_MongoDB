const supertest = require("supertest");
const expect = require("expect");
const {ObjectID} = require("mongodb");
const {app} = require("./../server");
const {Todo} = require("./../model/Todo-model");

const todos = [
  {
    _id: new ObjectID(),
    text: "Play Detroit Become Human"
  },
  {
    _id: new ObjectID(),
    text: "Play Horizon Zero Dawn",
    completed: true,
    completedAt: 333
  }
];

beforeEach((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => {
    done();
  })
  .catch((error) => {
    done(error);
  })
});

describe("POST /todos", () => {

  it("should create a new todo", (done) => {

    const text = "Silver for monsters";

    supertest(app)
    .post("/todos")
    .send({text})
    .expect(200)
    .expect((response) => {
      expect(response.body.text).toBe(text)
    })
    .end((error, response) => {
      if(error) {
        return done(error);
      }

      Todo.find(
        {
          text
        }
      ).then((todos) => {
        expect(todos.length).toBe(1)
        expect(todos[0].text).toBe(text)
        done();
      }).catch((error) => {
        done(error);
      })

    });
  });

  it("should not create a todo with invalid body data", (done) => {

    supertest(app)
    .post("/todos")
    .send({})
    .expect(400)
    .end((error, response) => {

      if(error) {
        return done(error);
      }

      Todo.find().then((todos) => {
        expect(todos.length).toBe(2);
        done();
      }).catch((error) => {
        done(error);
      });
    });
  });

});

describe("GET /todos", () => {

  it("should get all todos", (done) => {

    supertest(app)
    .get("/todos")
    .expect(200)
    .expect((response) => {
      expect(response.body.todos.length).toBe(2);
    }).end(done);
  });

});

describe("GET /todos/:id", () => {

  it("should get todo by id", (done) => {
    supertest(app)
    .get(`/todos/${todos[0]._id.toHexString()}`)
    .expect(200)
    .expect((response) => {
      expect(response.body._id).toBe(todos[0]._id.toHexString());
      expect(response.body.text).toBe(todos[0].text);
    })
    .end(done);
  });

  it("should return a 404 if todo not found", (done) => {

    supertest(app)
    .get(`/todos/${new ObjectID().toHexString()}`)
    .expect(404)
    .end(done);

  });

  it("should return a 404 for non-ObjectID", (done) => {

    supertest(app)
    .get(`/todos/123`)
    .expect(404)
    .end(done);

  });

});


describe("DELETE /todos/:id", () => {

  it("should remove a todo", (done) => {

    supertest(app)
    .delete(`/todos/${todos[0]._id.toHexString()}`)
    .expect(200)
    .expect((response) => {
      expect(response.body._id).toBe(todos[0]._id.toHexString());
      expect(response.body.text).toBe(todos[0].text);
    })
    .end((error, response) => {
      if(error) {
        return done(error);
      }

      Todo.findById(todos[0]._id)
      .then((todo) => {
        expect(todo).toNotExist();
        done();
      })
      .catch((error) => {
        done(error);
      });
    })

  });

  it("should return 404 when Todo not found", (done) => {

    supertest(app)
    .delete(`/todos/${new ObjectID().toHexString()}`)
    .expect(404)
    .end(done);

  });

  it("should return 404 if object id is invalid", (done) => {

    supertest(app)
    .delete("/todos/123")
    .expect(404)
    .end(done);

  });

});


describe("PATCH /todos/:id", () => {

  it("should update todo to completed", (done) => {
    
    supertest(app)
    .patch(`/todos/${todos[0]._id.toHexString()}`)
    .send(
      {
        text: "Completed playing Detroit Become Human",
        completed: true
      }
    )
    .expect(200)
    .expect((response) => {
      expect(response.body.text).toBe("Completed playing Detroit Become Human");
      expect(response.body.completedAt).toBeA("number");
    })
    .end((error, response) => {
      if(error) {
        return done(error);
      }

      Todo.findById(todos[0]._id)
      .then((todo) => {
        expect(todo.text).toBe("Completed playing Detroit Become Human");
        expect(todo.completed).toBe(true);
        expect(todo.completedAt).toBeA("number");
        done();
      })
      .catch((error) => {
        done(error);
      });
    });
  });

  it("should clear completed at when todo is not completed", (done) => {

    supertest(app)
    .patch(`/todos/${todos[1]._id.toHexString()}`)
    .send(
      {
        completed: false
      }
    )
    .expect(200)
    .expect((response) => {
      expect(response.body.completed).toBe(false);
      expect(response.body.completedAt).toNotExist();
    })
    .end((error, response) => {

      if(error) {
        return done(error);
      }

      Todo.findById(todos[1]._id)
      .then((todo) => {
        expect(todo.completed).toBe(false);
        expect(todo.completedAt).toNotExist();
        done();
      })
      .catch((error) => {
        done(error);
      });
    });
  });

});