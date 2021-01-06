// In NavigationBar component :
// const incompleteStr = "incomplete" === activated ? ' active' : ""
// const createStr = "create" === activated ? ' active' : ""
// const completeStr = "completed" === activated ? ' active' : ""

const navigate = (dest) => {
  return {
    type: "CHANGENAVIGATION",
    payload: dest,
  };
};

const navigateReducer = (state = "", action) => {
  switch (action.type) {
    case "CHANGENAVIGATION":
      return action.payload;
    default:
      return state;
  }
};
export { navigate, navigateReducer };
