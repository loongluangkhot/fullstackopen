import React from "react";
import { connect } from "react-redux";
import { createCreateAction } from "../reducers/anecdoteReducer";
import { createSetNotificationAction } from "../reducers/notificationReducer";

const AnecdoteForm = (props) => {
  const createAnecdote = async (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    console.log("create", content);
    e.target.anecdote.value = "";
    props.createCreateAction(content);
    const message = `you created '${content}'`;
    props.createSetNotificationAction(message);
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
};

const mapDispatchToProps = {
  createCreateAction,
  createSetNotificationAction,
};

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm);
export default ConnectedAnecdoteForm;
