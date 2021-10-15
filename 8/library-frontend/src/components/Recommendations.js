import React, { useState, useEffect } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import { ALL_BOOKS, ME } from "../queries";
import BooksTable from "./BooksTable";

const Recommendations = (props) => {
  const [books, setbooks] = useState([]);
  const [user, setuser] = useState(null);
  const [getAllBooks, allBooksResult] = useLazyQuery(ALL_BOOKS, {
    fetchPolicy: "cache-and-network",
  });
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
      const favouriteGenre = user.favoriteGenre;
      getAllBooks({ variables: { genre: favouriteGenre } });
    }
  }, [user, getAllBooks]);

  if (!props.show) {
    return null;
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favourite genre: <b>{user?.favoriteGenre}</b>
      </p>
      <BooksTable books={books} />
    </div>
  );
};

export default Recommendations;
