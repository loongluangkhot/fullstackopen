import React from "react";
import { useDispatch } from "react-redux";
import { createCreateAction } from "../reducers/anecdoteReducer";
import { showNotificationWithTimeout } from "../reducers/notificationReducer";

function AnecdoteForm() {
  const dispatch = useDispatch();

  const createAnecdote = (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    console.log("create", content);
    e.target.anecdote.value = "";
    dispatch(createCreateAction(content));
    const message = `you created '${content}'`;
    showNotificationWithTimeout(dispatch, message);
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
}

export default AnecdoteForm;
