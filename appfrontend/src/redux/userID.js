const addID = (user_ID) => {
  return {
    type: "ADDTHEUSERID",
    payload: user_ID,
  };
};

const removeID = () => {
  return {
    type: "REMOVETHEUSERID",
    payload: "",
  };
};

const IDReducer = (state = "", action) => {
  switch (action.type) {
    case "ADDTHEUSERID":
      return action.payload;
    case "REMOVETHEUSERID":
      return action.payload;
    default:
      return state;
  }
};

export { addID, removeID, IDReducer };
