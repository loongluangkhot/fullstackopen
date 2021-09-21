import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import Select from "react-select";
import Notify from "./Notify";
import { ALL_AUTHORS, UPDATE_AUTHOR } from "../queries";

const EditAuthor = (props) => {
  const [options, setoptions] = useState([]);
  const [selectedAuthor, setselectedAuthor] = useState();
  const [born, setborn] = useState("");
  const [error, seterror] = useState("");
  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (err) => {
      notify(err.graphQLErrors[0].message);
    },
  });
  const result = useQuery(ALL_AUTHORS);

  useEffect(() => {
    if (result.data && result.data.allAuthors) {
      const authors = result.data.allAuthors;
      const newOptions = authors.map((author) => ({
        value: author.name,
        label: author.name,
      }));
      setoptions(newOptions);
    }
  }, [result]);

  if (!props.show) {
    return null;
  }

  const notify = (message) => {
    seterror(message);
    setTimeout(() => {
      seterror(null);
    }, 10000);
  };

  const submit = async (e) => {
    e.preventDefault();
    const name = selectedAuthor.value;
    if(name && born) {
      console.log("edit author...");
      updateAuthor({
        variables: {
          name,
          born: parseInt(born),
        },
      });
      setselectedAuthor(null);
      setborn("");
      seterror("");
    } else {
      notify("Some fields are missing");
    }
  };

  return (
    <div>
      <Notify errorMessage={error} />
      <form onSubmit={submit}>
        <Select
          value={selectedAuthor}
          onChange={(selectedOption) => setselectedAuthor(selectedOption)}
          options={options}
        />
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setborn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default EditAuthor;
