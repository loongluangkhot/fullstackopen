import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import store from "./store";
import anecdoteService from "./services/anecdotes";
import { createInitAction } from "./reducers/anecdoteReducer";

anecdoteService
  .getAll()
  .then((anecdotes) => store.dispatch(createInitAction(anecdotes)));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
