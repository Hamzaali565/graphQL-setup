import express from "express";
import booklistRouter from "./routes/Booklist.routes/Booklist.routes.mjs";
import { ApolloServer } from "@apollo/server";
import cors from "cors";
import { expressMiddleware } from "@apollo/server/express4";
import axios from "axios";
const app = express();

app.use(express.json());

const server = new ApolloServer({
  typeDefs: ` 
        type Todo {
            id: ID!
            title: String!
            completed: Boolean
            }
            type Query {
                getTodos: [Todo]
                }
                `,
  resolvers: {
    Query: {
      getTodos: async () =>
        (await axios.get("https://jsonplaceholder.typicode.com/todos")).data,
    },
  },
});

app.use(cors());
await server.start();

app.use("/graphql", expressMiddleware(server));

app.use("/api/v1", booklistRouter);

export { app };
