import { gql } from "@apollo/client";

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    author {
      name
      born
      bookCount
      id
    }
    title
    published
    id
    genres
  }
`;

export const ALL_BOOKS = gql`
  ${BOOK_DETAILS}
  query allBooks($author: String, $genre: String) {
    allBooks(author: $author, genre: $genre) {
      ...BookDetails
    }
  }
`;

export const ALL_AUTHORS = gql`
  query allAuthors {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
`;

export const CREATE_BOOK = gql`
  ${BOOK_DETAILS}
  mutation createBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      ...BookDetails
    }
  }
`;

export const UPDATE_AUTHOR = gql`
  mutation updateAuthor($name: String!, $born: Int!) {
    editAuthor(name: $name, setBornTo: $born) {
      id
      name
      born
      bookCount
    }
  }
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

export const ME = gql`
  query me {
    me {
      id
      username
      favoriteGenre
    }
  }
`;

export const BOOK_ADDED_SUBSCRIPTION = gql`
  ${BOOK_DETAILS}
  subscription bookAdded {
    bookAdded {
      ...BookDetails
    }
  }
`;
