import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { ALL_BOOKS, ME } from "../queries";
import BooksTable from "./BooksTable";

const Recommendations = (props) => {
  const [books, setbooks] = useState([]);
  const [filteredBooks, setfilteredBooks] = useState([]);
  const [user, setuser] = useState(null);
  const allBooksResult = useQuery(ALL_BOOKS);
  const meResult = useQuery(ME);

  useEffect(() => {
    if (allBooksResult.data && allBooksResult.data.allBooks) {
      setbooks(allBooksResult.data.allBooks);
    }
  }, [allBooksResult]);

  useEffect(() => {
    if (meResult.data && meResult.data.me) {
      setuser(meResult.data.me);
    }
  }, [meResult]);

  useEffect(() => {
    if (user) {
      const newFilteredBooks = books.filter((book) =>
        book.genres.includes(user.favoriteGenre)
      );
      setfilteredBooks(newFilteredBooks);
    }
  }, [books, user]);

  if (!props.show) {
    return null;
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favourite genre: <b>{user?.favoriteGenre}</b>
      </p>
      <BooksTable books={filteredBooks} />
    </div>
  );
};

export default Recommendations;
