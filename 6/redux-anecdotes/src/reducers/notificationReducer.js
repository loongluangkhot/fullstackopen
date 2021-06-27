const initialState = "";

// Read more discussions on async with redux here: https://stackoverflow.com/questions/35411423/how-to-dispatch-a-redux-action-with-a-timeout
let timeout;
export const createSetNotificationAction = (message, delay = 5) => {
  if (timeout) {
    clearTimeout(timeout);
  }
  return async (dispatch) => {
    dispatch({
      type: "SET_NOTIFICATION",
      data: message,
    });
    timeout = setTimeout(() => {
      dispatch({
        type: "REMOVE_NOTIFICATION",
      });
    }, delay * 1000);
  };
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.data;
    case "REMOVE_NOTIFICATION":
      return "";
    default:
      return state;
  }
};

export default notificationReducer;
