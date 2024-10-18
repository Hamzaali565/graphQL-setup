import { gql } from "graphql-tag";

export const userType = gql`
  type User {
    id: ID!
    name: String!
    username: String!
    phone: String!
  }
`;

export const todoType = gql`
  type Todo {
    id: ID!
    title: String!
    completed: Boolean
    user: User
  }
`;

export const queryType = gql`
  type Query {
    getTodos: [Todo]
    getAllUsers: [User]
    getUser(id: ID!): User
  }
`;
