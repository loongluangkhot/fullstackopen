require("dotenv").config();
const { createServer } = require("http");
const { execute, subscribe } = require("graphql");
const { SubscriptionServer } = require("subscriptions-transport-ws");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("./models/user");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

(async function () {
  const app = express();
  const httpServer = createServer(app);

  const corsOptions = {
    origin: "*",
    credentials: true,
  };
  app.use(cors(corsOptions));

  const { MONGODB_URI, JWT_SECRET } = process.env;
  mongoose
    .connect(MONGODB_URI)
    .then(() => {
      console.log("connected to MongoDB: ", MONGODB_URI);
    })
    .catch((error) => {
      console.log("error connection to MongoDB: ", error.message);
    });

  const context = async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith("bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  };

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  const subscriptionServer = SubscriptionServer.create(
    { schema, execute, subscribe },
    { server: httpServer }
  );

  const server = new ApolloServer({
    context,
    schema,
    plugins: [
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close();
            },
          };
        },
      },
    ],
  });
  await server.start();
  server.applyMiddleware({ app });

  const PORT = 4000;
  httpServer.listen(PORT, () =>
    console.log(`Server is now running on http://localhost:${PORT}/graphql`)
  );
})();
