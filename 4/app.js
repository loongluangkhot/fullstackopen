const express = require("express");
const app = express();
require("express-async-errors");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./utils/config");
const logger = require("./utils/logger");
const loginRouter = require("./controllers/login");
const userRouter = require("./controllers/users");
const blogsRouter = require("./controllers/blogs");
const middleware = require("./utils/middleware");

mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

app.use(cors());
app.use(express.json());
app.use(middleware.tokenExtractor);
app.use("/api/login", loginRouter);
app.use("/api/users", userRouter);
app.use("/api/blogs", blogsRouter);

if (process.env.NODE_ENV === "test") {
  const testRouter = require("./controllers/test");
  app.use("/api/test", testRouter);
}

app.use("", (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
});
app.use("", (error, request, response, next) => {
  if (error.name === "ValidationError") {
    response.status(400).json({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    response.status(401).json({ error: error.message });
  }
  logger.error(error.message);
  next(error);
});

module.exports = app;
