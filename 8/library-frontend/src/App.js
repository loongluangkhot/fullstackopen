import React, { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import EditAuthor from "./components/EditAuthor";

const App = () => {
  const [page, setPage] = useState("authors");

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("addBook")}>add book</button>
        <button onClick={() => setPage("editAuthor")}>edit author</button>
      </div>

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook show={page === "addBook"} />

      <EditAuthor show={page === "editAuthor"} />
    </div>
  );
};

export default App;
