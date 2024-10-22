import {
  creationQuery,
  queryResolvers,
  todoResolvers,
  userResolvers,
} from "../Schemas/Todos/Todo.resolver.mjs";

export const resolvers = {
  ...todoResolvers,
  ...userResolvers,
  ...queryResolvers,
  ...creationQuery,
};
