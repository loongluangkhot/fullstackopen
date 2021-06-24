const initialState = "Welcome!";

export const createSetNotificationAction = (message) => {
  return {
    type: "SET_NOTIFICATION",
    data: message,
  };
};

export const createRemoveNotificationAction = () => {
  return {
    type: "REMOVE_NOTIFICATION"
  }
}

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

// Read more discussions on async with redux here: https://stackoverflow.com/questions/35411423/how-to-dispatch-a-redux-action-with-a-timeout
let timeout;
export const showNotificationWithTimeout = (dispatch, message, delay = 5000) => {
  if(timeout) {
    clearTimeout(timeout);
  }
  dispatch(createSetNotificationAction(message));
  timeout = setTimeout(() => {
    dispatch(createRemoveNotificationAction());
  }, delay);
}

export default notificationReducer;
