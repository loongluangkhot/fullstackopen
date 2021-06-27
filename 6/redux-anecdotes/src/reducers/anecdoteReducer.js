export const createVoteAction = (id) => {
  return {
    type: "VOTE",
    data: { id },
  };
};

export const createCreateAction = (anecdote) => {
  return {
    type: "CREATE",
    data: anecdote,
  };
};

export const createInitAction = (anecdotes) => {
  return {
    type: "INIT",
    data: anecdotes,
  };
};

const anecdoteReducer = (state = [], action) => {
  console.log("state now: ", state);
  console.log("action", action);
  switch (action.type) {
    case "VOTE":
      const id = action.data.id;
      let newState = [];
      state.forEach((anecdote) => {
        if (anecdote.id === id) {
          const updated = {
            ...anecdote,
            votes: anecdote.votes + 1,
          };
          newState.push(updated);
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
