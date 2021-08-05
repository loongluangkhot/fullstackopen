export const Anecdote = ({ anecdote }) => {
  const { content, author, votes, info } = anecdote;
  return (
    <div>
      <h1>
        {content} by {author}
      </h1>
      <p>has {votes} votes</p>
      <p>
        for more info see <a href={info} target="_blank" rel="noreferrer">{info}</a>
      </p>
    </div>
  );
};
