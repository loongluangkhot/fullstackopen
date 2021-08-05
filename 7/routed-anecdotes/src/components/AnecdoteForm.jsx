import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useField } from "../hooks";

export const AnecdoteForm = (props) => {
  const history = useHistory();
  const { reset: resetContentField, ...contentField } = useField("text");
  const { reset: resetAuthorField, ...authorField } = useField("text");
  const { reset: resetInfoField, ...infoField } = useField("text");

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: contentField.value,
      author: authorField.value,
      info: infoField.value,
      votes: 0,
    });
    history.push("/");
  };

  const handleReset = (e) => {
    e.preventDefault();
    resetContentField();
    resetAuthorField();
    resetInfoField();
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name="content" {...contentField} />
        </div>
        <div>
          author
          <input name="author" {...authorField} />
        </div>
        <div>
          url for more info
          <input name="info" {...infoField} />
        </div>
        <div>
          <button>create</button>
          <button onClick={handleReset}>reset</button>
        </div>
      </form>
    </div>
  );
};
