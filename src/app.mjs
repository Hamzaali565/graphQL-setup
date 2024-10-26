import express from "express";
import booklistRouter from "./routes/Booklist.routes/Booklist.routes.mjs";
import { ApolloServer } from "@apollo/server";
import cors from "cors";
import { expressMiddleware } from "@apollo/server/express4";
import { resolvers } from "./Resolver.all/Resolvers.all.mjs";
import { typeDefs } from "./Schemas/Todos/Todo.Schema.mjs";
import { applyMiddleware } from "graphql-middleware";
import { makeExecutableSchema } from "@graphql-tools/schema";

const app = express();

app.use(express.json());

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const uppercaseCategory = async (resolve, parent, args, context, info) => {
  console.log(context);

  const result = await resolve(parent, args, context, info);

  return result.toUpperCase();
};

const postMiddleware = {
  Books: {
    title: uppercaseCategory,
  },
};

const bookmiddleware = {
  Books: {
    author: uppercaseCategory,
  },
};

const middleware = [postMiddleware, bookmiddleware];

const schemaWithMiddleware = applyMiddleware(schema, ...middleware);

export const server = new ApolloServer({
  schema: schemaWithMiddleware,
});

app.use(cors());
await server.start();
app.use("/graphql", expressMiddleware(server));

app.use("/api/v1", booklistRouter);

export { app };
