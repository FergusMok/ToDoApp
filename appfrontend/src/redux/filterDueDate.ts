const filterDueDate = (value) => {
  return {
    type: "FILTERDATECHANGE",
    payload: value,
  };
};

const resetFilterDueDate = () => {
  return {
    type: "FILTERDATERESET",
  };
};

const filterDueDateReducer = (state = null, action) => {
  switch (action.type) {
    case "FILTERDATECHANGE":
      return action.payload;
    case "FILTERDATERESET":
      return null;
    default:
      return state;
  }
};

export { filterDueDate, resetFilterDueDate, filterDueDateReducer };
