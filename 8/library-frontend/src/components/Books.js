import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";

const Books = (props) => {
  const [books, setbooks] = useState([]);
  const [filteredBooks, setfilteredBooks] = useState([]);
  const [genreFilter, setgenreFilter] = useState(null);
  const result = useQuery(ALL_BOOKS);

  useEffect(() => {
    if (result.data && result.data.allBooks) {
      setbooks(result.data.allBooks);
    }
  }, [result]);

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

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {genres.map((genre) => (
          <button onClick={() => setgenreFilter(genre)}>{genre}</button>
        ))}
        <button onClick={() => setgenreFilter(null)}>all genres</button>
      </div>
    </div>
  );
};

export default Books;
