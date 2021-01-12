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
      console.log("Sort by due, so false");
      return action.payload;
    case "SORTBYUPDATEDATE":
      console.log("Sort by update, so true");
      return action.payload;
    default:
      return state;
  }
};

export { sortByDueDate, sortByUpdateDate, sortReducer };
