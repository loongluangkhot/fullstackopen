import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { asObject } from "./reducers/anecdoteReducer";

const App = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  const vote = (id) => {
    console.log("vote", id);
    dispatch({
      type: "VOTE",
      data: { id },
    });
  };

  const addAnecdote = (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    console.log("add", content);
    e.target.anecdote.value = "";
    dispatch({
      type: "NEW",
      data: asObject(content),
    });
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default App;
