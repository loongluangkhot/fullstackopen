import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts}/>
      <Total exercises={parts.map(part => part.exercises).reduce((a, b) => a + b)} />
    </div>
  )
}

const Header = (props) => {
  return(
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  return(
    <p>{props.part} {props.exercises}</p>
  )
}

const Content = (props) => {
  const Parts = props.parts.map(part => <Part part={part.name} exercises={part.exercises} />)
  return (
    <div>
      {Parts}
    </div>
  )
}

const Total = (props) => {
  return(
    <p>Number of exercises {props.exercises}</p>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))