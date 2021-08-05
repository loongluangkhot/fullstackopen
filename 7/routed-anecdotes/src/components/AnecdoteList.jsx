import { Link } from "react-router-dom";

export const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map((anecdote) => (
        <Link to={`/anecdotes/${anecdote.id}`}>
          <li key={anecdote.id}>{anecdote.content}</li>
        </Link>
      ))}
    </ul>
  </div>
);
