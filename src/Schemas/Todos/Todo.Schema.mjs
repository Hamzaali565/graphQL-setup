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

export const BookList = gql`
  type Books {
    title: String!
    author: String!
    description: String!
    publishedYear: Int!
    active: Boolean!
  }
`;

export const queryType = gql`
  type Query {
    getTodos: [Todo]
    getAllUsers: [User]
    getUser(id: ID!): User
     getBooks(title: String, author: String, description: String): [Books]
  }
`;
