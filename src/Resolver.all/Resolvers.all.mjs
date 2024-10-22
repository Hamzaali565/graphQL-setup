import {
  creationQuery,
  queryResolvers,
  todoResolvers,
} from "../Schemas/Todos/Todo.resolver.mjs";

export const resolvers = {
  ...todoResolvers,
  ...queryResolvers,
  ...creationQuery,
};
