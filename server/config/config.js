const env = process.env.NODE_ENV || "development";

console.log("ENV ******", env);

const TodoAppDev = "TODOApp";
const TodoAppTest = "TODOAppTest";

if(env === "development") {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = `mongodb://localhost:27017/${TodoAppDev}`;
}else if(env === "test") {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = `mongodb://localhost:27017/${TodoAppTest}`;
}