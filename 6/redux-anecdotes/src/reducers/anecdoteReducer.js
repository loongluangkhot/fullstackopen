import anecdoteService from "../services/anecdotes";

export const createVoteAction = (anecdote) => {
  return async (dispatch) => {
    const payload = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };
    const upvotedAnecdote = await anecdoteService.edit(payload);
    console.log(upvotedAnecdote);
    dispatch({
      type: "VOTE",
      data: upvotedAnecdote,
    });
  };
};

export const createCreateAction = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.createNew(content);
    dispatch({
      type: "CREATE",
      data: anecdote,
    });
  };
};

export const createInitAction = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: "INIT",
      data: anecdotes,
    });
  };
};

const anecdoteReducer = (state = [], action) => {
  console.log("state now: ", state);
  console.log("action", action);
  switch (action.type) {
    case "VOTE":
      const upvotedAnecdote = action.data;
      let newState = [];
      state.forEach((anecdote) => {
        if (anecdote.id === upvotedAnecdote.id) {
          newState.push(upvotedAnecdote);
        } else {
          newState.push(anecdote);
        }
      });
      return newState;
    case "CREATE":
      return [...state, action.data];
    case "INIT":
      return action.data;
    default:
      return state;
  }
};

export default anecdoteReducer;
