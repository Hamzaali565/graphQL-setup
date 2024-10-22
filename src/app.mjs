import express from "express";
import booklistRouter from "./routes/Booklist.routes/Booklist.routes.mjs";
import { ApolloServer } from "@apollo/server";
import cors from "cors";
import { expressMiddleware } from "@apollo/server/express4";
import { resolvers } from "./Resolver.all/Resolvers.all.mjs";
import { typeDefs } from "./Schemas/Todos/Todo.Schema.mjs";
const app = express();

app.use(express.json());

export const server = new ApolloServer({
  typeDefs,
  resolvers,
});

app.use(cors());
await server.start();
app.use("/graphql", expressMiddleware(server));

app.use("/api/v1", booklistRouter);

export { app };
