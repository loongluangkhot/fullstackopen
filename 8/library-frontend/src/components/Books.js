import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";
import BooksTable from "./BooksTable";

const Books = (props) => {
  const [books, setbooks] = useState([]);
  const [filteredBooks, setfilteredBooks] = useState([]);
  const [genreFilter, setgenreFilter] = useState(null);
  const allBooksResult = useQuery(ALL_BOOKS);

  useEffect(() => {
    if (allBooksResult.data && allBooksResult.data.allBooks) {
      setbooks(allBooksResult.data.allBooks);
    }
  }, [allBooksResult]);

  useEffect(() => {
    if (genreFilter === null) {
      setfilteredBooks(books);
    } else {
      const newFilteredBooks = books.filter((book) =>
        book.genres.includes(genreFilter)
      );
      setfilteredBooks(newFilteredBooks);
    }
  }, [books, genreFilter]);

  if (!props.show) {
    return null;
  }

  const genres = [...new Set(books.flatMap((book) => book.genres))];

  return (
    <div>
      <h2>books</h2>
      <p>
        in genre: <b>{genreFilter || "all genres"}</b>
      </p>
      <BooksTable books={filteredBooks} />
      <div>
        {genres.map((genre) => (
          <button key={genre} onClick={() => setgenreFilter(genre)}>
            {genre}
          </button>
        ))}
        <button onClick={() => setgenreFilter(null)}>all genres</button>
      </div>
    </div>
  );
};

export default Books;
