import express from "express";
import booklistRouter from "./routes/Booklist.routes/Booklist.routes.mjs";
import { ApolloServer } from "@apollo/server";
import cors from "cors";
import { expressMiddleware } from "@apollo/server/express4";
import axios from "axios";
import { Todo } from "./Constants/Todo.mjs";
import {
  BookList,
  queryType,
  todoType,
  userType,
} from "./Schemas/Todos/Todo.Schema.mjs";
import { getfilteredBooks } from "./Controllers/Booklist.Controller/Booklist.Controller.mjs";
const app = express();

app.use(express.json());

const typeDefs = [userType, todoType, BookList, queryType];

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Todo: {
      user: async (todo) =>
        (
          await axios.get(
            `https://jsonplaceholder.typicode.com/users/${todo?.id}`
          )
        ).data,
    },
    Query: {
      getTodos: () => Todo,
      getBooks: (parent, { title, author, description }) =>
        getfilteredBooks(title, author, description),
      getAllUsers: async () =>
        (await axios.get("https://jsonplaceholder.typicode.com/users")).data,
      getUser: async (parent, { id }) =>
        (await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`))
          .data,
    },
  },
});

app.use(cors());
await server.start();

app.use("/graphql", expressMiddleware(server));

app.use("/api/v1", booklistRouter);

export { app };
