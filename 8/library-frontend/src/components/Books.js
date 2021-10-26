import React, { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";
import BooksTable from "./BooksTable";

const Books = (props) => {
  const [books, setbooks] = useState([]);
  const [genres, setgenres] = useState([]);
  const [genreFilter, setgenreFilter] = useState(null);
  const [getAllBooks, allBooksResult] = useLazyQuery(ALL_BOOKS, {
    variables: { genre: genreFilter },
  });

  useEffect(() => {
    if (allBooksResult.data && allBooksResult.data.allBooks) {
      const newBooks = allBooksResult.data.allBooks;
      const newGenresSet = new Set(newBooks.flatMap((book) => book.genres));
      genres.forEach((existingGenre) => newGenresSet.add(existingGenre));
      const newGenres = [...newGenresSet].sort();
      setbooks(allBooksResult.data.allBooks);
      setgenres(newGenres);
    }
    // eslint-disable-next-line
  }, [allBooksResult]);

  useEffect(() => {
    if (allBooksResult.data) {
      console.log(genreFilter);
      allBooksResult.refetch();
    } else {
      getAllBooks();
    }
    // eslint-disable-next-line
  }, [genreFilter, getAllBooks]);

  if (!props.show) {
    return null;
  }

  return (
    <div>
      <h2>books</h2>
      <p>
        in genre: <b>{genreFilter || "all genres"}</b>
      </p>
      <BooksTable books={books} />
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
