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
    text: "Play Horizon Zero Dawn"
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

