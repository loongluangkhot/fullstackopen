import React, { useState } from "react";
import { useApolloClient } from "@apollo/client";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import EditAuthor from "./components/EditAuthor";
import Login from "./components/Login";
import Recommendations from "./components/Recommendations";
import { LOCAL_STORAGE_KEY } from "./constants";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  const handleLogin = (token) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, token);
    setToken(token);
    setPage("authors"); // redirect to authors page upon login
  };

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token === null && (
          <button onClick={() => setPage("login")}>login</button>
        )}
        {token !== null && (
          <>
            <button onClick={() => setPage("recommend")}>recommend</button>
            <button onClick={() => setPage("addBook")}>add book</button>
            <button onClick={() => setPage("editAuthor")}>edit author</button>
            <button onClick={logout}>logout</button>
          </>
        )}
      </div>
      <Authors show={page === "authors"} />
      <Books show={page === "books"} />
      <NewBook show={page === "addBook"} />
      <EditAuthor show={page === "editAuthor"} />
      <Login show={page === "login"} onLogin={handleLogin} />
      {token !== null && <Recommendations show={page === "recommend"} />}
    </div>
  );
};

export default App;
