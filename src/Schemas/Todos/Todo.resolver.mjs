import axios from "axios";
import {
  bookListCreation,
  getDataById,
  getfilteredBooks,
} from "../../Controllers/Booklist.Controller/Booklist.Controller.mjs";
import { Todo } from "../../Constants/Todo.mjs";

export const todoResolvers = {
  Todo: {
    user: async (todo) => {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${todo?.id}`
      );
      return response.data;
    },
  },
};

export const userResolvers = {
  Query: {
    getAllUsers: async () => {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      return response.data;
    },
    getUser: async (parent, { id }) => {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${id}`
      );
      return response.data;
    },
  },
};

export const queryResolvers = {
  Query: {
    getTodos: () => Todo,
    getBooks: (parent, { title, author, description }) =>
      getfilteredBooks(title, author, description),
    getBookBy_id: async (parent, { _id }) => await getDataById(_id),
  },
};

export const creationQuery = {
  Query: {},
  Mutation: {
    createBook: async (parent, { input }) => bookListCreation(input),
  },
};