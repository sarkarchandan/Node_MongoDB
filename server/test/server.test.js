const supertest = require("supertest");
const expect = require("expect");

const {app} = require("./../server");
const {Todo} = require("./../model/Todo-model");

const todos = [
  {
    text: "Play Detroit Become Human"
  },
  {
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

