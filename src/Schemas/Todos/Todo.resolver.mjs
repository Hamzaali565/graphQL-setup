import axios from "axios";
import {
  bookListCreation,
  DeleteADoc,
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

// export const userResolvers = {
//   Query: {
//     getAllUsers: async () =>
//       (await axios.get("https://jsonplaceholder.typicode.com/users")).data,

//     getUser: async (parent, { id }) => {
//       const response = await axios.get(
//         `https://jsonplaceholder.typicode.com/users/${id}`
//       );
//       return response.data;
//     },
//   },
// };

export const queryResolvers = {
  Query: {
    getTodos: () => Todo,
    getBooks: async (parent, { title, author, description }) =>
      await getfilteredBooks(title, author, description),
    getBookBy_id: async (parent, { _id }) => await getDataById(_id),
  },
};

export const creationQuery = {
  Mutation: {
    createBook: async (_, { input }) => bookListCreation(input),
    updateBook: async (_, { input }) => {
      if (![input?._id].every(Boolean))
        throw new ApiError(404, "Missing dataaaa");
      return await updateDocumnet(input);
    },
    deleteBook: async (_, { input }) => {
      console.log(input?._id);

      if (![input?._id].every(Boolean))
        throw new ApiError(404, "Missing dataaaa");
      return await DeleteADoc(input);
    },
  },
};
