const DataLoader = require("dataloader");
const Book = require("../models/book");
const { groupBy } = require("lodash");

const booksByAuthorLoader = new DataLoader((authorIds) => {
  return Book.find({ author: { $in: authorIds } }).then((books) => {
    const booksGroupByAuthor = groupBy(books, (book) => book.author.toString());
    return authorIds.map((authorId) => booksGroupByAuthor[authorId] || []);
  });
});

module.exports = {
  booksByAuthorLoader,
};
