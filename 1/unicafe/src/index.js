import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);
  const [avg, setAvg] = useState(0);
  const [pos, setPos] = useState(0);

  const handleClick = (label) => {
    let temp = {
      good,
      neutral,
      bad,
      total,
    };

    temp[label] += 1;
    temp.total += 1;

    setGood(temp.good);
    setNeutral(temp.neutral);
    setBad(temp.bad);
    setTotal(temp.total);

    setAvg((temp.good - temp.bad) / temp.total);
    setPos((temp.good / temp.total) * 100);
  };

  const scores = [
    {
      label: "good",
      value: good
    },
    {
      label: "neutral",
      value: neutral
    },
    {
      label: "bad",
      value: bad
    },
    {
      label: "all",
      value: total
    },
    {
      label: "average",
      value: avg
    },
    {
      label: "positive",
      value: pos,
      decorator: "%"
    },
  ]

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button label="good" handleClick={handleClick} />
        <Button label="neutral" handleClick={handleClick} />
        <Button label="bad" handleClick={handleClick} />
      </div>
      <h1>statistics</h1>
      <Statistics scores={scores} />
    </div>
  );
};

const Button = ({ label, handleClick }) => {
  return (
    <button type="button" onClick={() => handleClick(label)}>
      {label}
    </button>
  );
};

const Statistic = ({ text, value, decorator }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value} {decorator}</td>
    </tr>
  );
};

const Statistics = ({scores}) => {
  if(scores.some(score => score.value !== 0)) {
    return (
      <table>
        <tbody>
          {scores.map(score => <Statistic key={score.label} text={score.label} value={score.value} decorator={score.decorator}/>)}
        </tbody>
      </table>
    );
  } else {
    return (
      <p>No feedback given</p>
    )
  }

};

ReactDOM.render(<App />, document.getElementById("root"));
