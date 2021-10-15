const { UserInputError } = require("apollo-server-errors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Book = require("../models/book");
const Author = require("../models/author");
const User = require("../models/user");

const { JWT_SECRET, PASSWORD } = process.env;

const checkAuth = (currentUser) => {
  if (!currentUser) {
    throw new AuthenticationError("not authenticated");
  }
};

const resolvers = {
  Author: {
    bookCount: async (root) => {
      const authorId = root.id;
      return await Book.count({ author: mongoose.Types.ObjectId(authorId) });
    },
  },

  Query: {
    bookCount: async () => {
      return await Book.count({});
    },
    authorCount: async () => {
      return await Author.count({});
    },
    allBooks: async (root, args) => {
      // TODO: handle query with params
      try {
        let books = await Book.find({}).populate("author");
        const authorNameFilter = args.author;
        if(authorNameFilter) {
          books = books.filter(book => book.author.name === authorNameFilter);
        }
        const genreFilter = args.genre;
        if(genreFilter) {
          books = books.filter(book => book.genres.includes(genreFilter));
        }
        return books;
      } catch (e) {
        throw new UserInputError(e.message, {
          invalidArgs: args,
        });
      }
    },
    allAuthors: async () => {
      return await Author.find({});
    },
    me: (root, args, context) => {
      return context.currentUser;
    },
  },

  Mutation: {
    addBook: async (root, args, context) => {
      // Add book
      const { currentUser } = context;
      checkAuth(currentUser);
      const { title, published, author: authorName, genres } = args;
      try {
        let author = await Author.findOne({ name: authorName });
        if (!author) {
          const authorDto = {
            name: authorName,
          };
          author = new Author(authorDto);
          await author.save();
        }
        const bookDto = {
          title,
          published,
          author,
          genres,
        };
        const book = new Book(bookDto);
        await book.save();
        return book;
      } catch (e) {
        throw new UserInputError(e.message, {
          invalidArgs: args,
        });
      }
    },
    editAuthor: async (root, args, context) => {
      const { currentUser } = context;
      checkAuth(currentUser);
      const { name: authorName, setBornTo } = args;
      try {
        const author = await Author.findOneAndUpdate(
          { name: authorName },
          { born: setBornTo },
          { new: true }
        );
        return author;
      } catch (e) {
        throw new UserInputError(e.message, {
          invalidArgs: args,
        });
      }
    },
    createUser: async (root, args) => {
      const userDto = args;
      try {
        const user = new User(userDto);
        await user.save();
        return user;
      } catch (e) {
        throw new UserInputError(e.message, {
          invalidArgs: args,
        });
      }
    },
    login: async (root, args) => {
      const { username, password } = args;
      const user = await User.findOne({ username });
      if (!user || password !== PASSWORD) {
        throw new UserInputError("wrong credentials");
      }
      const userForToken = {
        username: user.username,
        id: user._id,
      };
      const value = jwt.sign(userForToken, JWT_SECRET);
      return { value };
    },
  },
};

module.exports = resolvers;
