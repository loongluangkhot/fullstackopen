import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { createVoteAction } from "../reducers/anecdoteReducer";
import { showNotificationWithTimeout } from "../reducers/notificationReducer";

function AnecdoteList() {
  const anecdotes = useSelector((state) => state.anecdotes);
  const dispatch = useDispatch();

  const vote = (anecdote) => {
    const { id, content } = anecdote;
    console.log("vote", id);
    dispatch(createVoteAction(id));
    const message = `you voted '${content}'`;
    showNotificationWithTimeout(dispatch, message);
  };

  return (
    <div>
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  );
}

export default AnecdoteList;
