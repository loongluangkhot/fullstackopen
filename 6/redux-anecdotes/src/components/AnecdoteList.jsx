import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { createVoteAction } from "../reducers/anecdoteReducer";
import { createSetNotificationAction } from "../reducers/notificationReducer";

function AnecdoteList() {
  const anecdotes = useSelector((state) => state.anecdotes);
  const filter = useSelector(state => state.filter);
  const dispatch = useDispatch();

  const vote = (anecdote) => {
    const { id, content } = anecdote;
    console.log("vote", id);
    dispatch(createVoteAction(anecdote));
    const message = `you voted '${content}'`;
    dispatch(createSetNotificationAction(message));
  };

  return (
    <div>
      {anecdotes
        .filter(anecdote => anecdote.content.toLocaleLowerCase().includes(filter))
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
