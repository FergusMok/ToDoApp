// In NavigationBar component :
// const incompleteStr = "incomplete" === activated ? ' active' : ""
// const createStr = "create" === activated ? ' active' : ""
// const completeStr = "completed" === activated ? ' active' : ""

const navigate = (dest: string) => {
  return {
    type: "CHANGENAVIGATION",
    payload: dest,
  };
};

type ActionType = ReturnType<typeof navigate>;

const navigateReducer = (state: string = "", action: ActionType) => {
  switch (action.type) {
    case "CHANGENAVIGATION":
      return action.payload;
    default:
      return state;
  }
};
export { navigate, navigateReducer };
