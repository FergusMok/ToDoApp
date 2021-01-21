const addID = (user_ID: string) => {
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
type ActionType = ReturnType<typeof addID> | ReturnType<typeof removeID>;

const IDReducer = (state = "", action: ActionType) => {
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
