import React, { useState } from "react";
import { useApolloClient, useSubscription } from "@apollo/client";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import EditAuthor from "./components/EditAuthor";
import Login from "./components/Login";
import Recommendations from "./components/Recommendations";
import { LOCAL_STORAGE_KEY } from "./constants";
import { ALL_BOOKS, BOOK_ADDED_SUBSCRIPTION } from "./queries";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  const updateAllBooksCacheWith = (bookAdded) => {
    const includedIn = (set, object) =>
      set.map((p) => p.id).includes(object.id);
    const genres = [null, ...bookAdded.genres];
    for (const genre of genres) {
      const dataInStore = client.readQuery({
        query: ALL_BOOKS,
        variables: { genre },
      });
      if (!includedIn(dataInStore.allBooks, bookAdded)) {
        client.writeQuery({
          query: ALL_BOOKS,
          variables: { genre },
          data: { allBooks: dataInStore.allBooks.concat(bookAdded) },
        });
      }
    }
  };

  useSubscription(BOOK_ADDED_SUBSCRIPTION, {
    onSubscriptionData: ({ subscriptionData }) => {
      const bookAdded = subscriptionData.data?.bookAdded;
      if (bookAdded) {
        window.alert(
          `A new book is added: ${bookAdded.title} by ${bookAdded.author.name}`
        );
        updateAllBooksCacheWith(bookAdded);
      }
    },
  });

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
      <Login show={page === "login"} onLogin={handleLogin} />
      {token !== null && (
        <>
          <Recommendations show={page === "recommend"} />
          <NewBook show={page === "addBook"} />
          <EditAuthor show={page === "editAuthor"} />
        </>
      )}
    </div>
  );
};

export default App;
