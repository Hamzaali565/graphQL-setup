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
    _id: String
  }
`;

// book creation k liye ye schema define kiya hai "!" ka matlab hai jo parameters laazmi hai..

const BookCreation = gql`
  input CreateBookInput {
    title: String!
    author: String!
    description: String!
    publishedYear: Int!
    active: Boolean
    _id: String
  }
`;

const BookUpdation = gql`
  input UpdateBookInput {
    title: String
    author: String
    description: String
    publishedYear: Int
    active: Boolean
    _id: String!
  }
`;

export const queryType = gql`
  type Query {
    getTodos: [Todo]
    getAllUsers: [User]
    getUser(id: ID!): User
    getBooks(title: String, author: String, description: String): [Books]
    getBookBy_id(_id: String): Books
  }

  type Mutation {
    createBook(input: CreateBookInput): Books
    updateBook(input: UpdateBookInput): Books
    deleteBook(input: UpdateBookInput): Books
  }
`;

export const typeDefs = [
  userType,
  todoType,
  BookList,
  BookCreation,
  BookUpdation,
  queryType,
];
