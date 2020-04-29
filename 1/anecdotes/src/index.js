import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState((new Array(props.anecdotes.length)).fill(0))
  const max = votes.indexOf(Math.max(...votes));

  const handleClick_next = () => {
    setSelected(Math.floor(Math.random() * props.anecdotes.length));
  }
  
  const handleClick_voted = (voted) => {
    const temp = [...votes];
    temp[voted] += 1;
    setVotes(temp);
  }

  return (
    <>
      <div>
        <h1>Anecdote of the day</h1>
        <div>
          {props.anecdotes[selected]}<br/>
          has {votes[selected]} votes
        </div>
        <div>
          <button type="button" onClick={() => handleClick_voted(selected)}>vote</button>
          <button type="button" onClick={handleClick_next}>next anecdote</button>
        </div>
      </div>
      <div>
        <h1>Anecdote with most votes</h1>
        <div>
          {props.anecdotes[max]}<br/>
          has {votes[max]} votes
        </div>
      </div>
    </>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)