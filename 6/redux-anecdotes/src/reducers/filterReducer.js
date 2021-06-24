const initialState = "";

export const createFilterAction = (filter) => {
  return {
    type: "FILTER",
    filter,
  };
};

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FILTER":
      return action.filter;
    default:
      return state;
  }
};

export default filterReducer;
