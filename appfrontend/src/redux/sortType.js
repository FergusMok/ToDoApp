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

// By default, we will sort by the due date.
const sortReducer = (state = false, action) => {
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
