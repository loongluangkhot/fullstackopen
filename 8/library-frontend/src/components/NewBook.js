import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import Notify from "./Notify";
import { ALL_AUTHORS, ALL_BOOKS, CREATE_BOOK } from "../queries";

const NewBook = (props) => {
  const [title, setTitle] = useState("");
  const [author, setAuhtor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);
  const [error, seterror] = useState("");
  const [createBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
    onError: (err) => {
      notify(err.graphQLErrors[0].message);
    },
  });

  if (!props.show) {
    return null;
  }

  const notify = (message) => {
    seterror(message);
    setTimeout(() => {
      seterror(null);
    }, 10000);
  }

  const submit = async (event) => {
    event.preventDefault();
    if(title && published && author && genres) {
      console.log("add book...");
      createBook({
        variables: {
          title,
          author,
          published: parseInt(published),
          genres,
        },
      });
      setTitle("");
      setPublished("");
      setAuhtor("");
      setGenres([]);
      setGenre("");
      seterror("");
    } else {
      notify("Some fields are missing");
    }

  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre("");
  };

  return (
    <div>
      <Notify errorMessage={error} />
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuhtor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(" ")}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

export default NewBook;
