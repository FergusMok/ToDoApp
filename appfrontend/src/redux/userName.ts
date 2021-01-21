const addName = (user_name: string) => {
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

type ActionType = ReturnType<typeof addName> | ReturnType<typeof removeName>;

const userNameReducer = (state: string = "", action: ActionType) => {
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
