import axios from "axios";
import {
  bookListCreation,
  getDataById,
  getfilteredBooks,
  updateDocumnet,
} from "../../Controllers/Booklist.Controller/Booklist.Controller.mjs";
import { Todo } from "../../Constants/Todo.mjs";
import { ApiError } from "../../utils/ApiError.mjs";

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
    updateBook: async (parent, { input }) => {
      if (![input?._id, input?.author].every(Boolean))
        throw new ApiError(404, "Missing dataaaa");
      return await getDataById(input);
    },
  },
};
