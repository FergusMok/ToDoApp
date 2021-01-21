const sortByDueDate = () => {
  return {
    type: "SORTBYDUEDATE",
    payload: false,
  };
};
const sortByUpdateDate = () => {
  return {
    type: "SORTBYUPDATEDATE",
    payload: true,
  };
};

type ActionType = ReturnType<typeof sortByDueDate> | ReturnType<typeof sortByUpdateDate>;

// By default, we will sort by the due date.
const sortReducer = (state: boolean = false, action: ActionType) => {
  switch (action.type) {
    case "SORTBYDUEDATE":
      return action.payload;
    case "SORTBYUPDATEDATE":
      return action.payload;
    default:
      return state;
  }
};

export { sortByDueDate, sortByUpdateDate, sortReducer };
