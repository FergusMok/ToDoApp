const addName = (user_name) => {
  return {
    type: "ADDNAME",
    payload: user_name,
  };
};

const removeName = () => {
  return {
    type: "REMOVENAME",
    payload: "",
  };
};

const userNameReducer = (state = "", action) => {
  switch (action.type) {
    case "ADDNAME":
      return action.payload;
    case "REMOVENAME":
      return action.payload;
    default:
      return state;
  }
};

export { addName, removeName, userNameReducer };
