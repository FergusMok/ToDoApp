const filterDueDate = (value: number) => {
  return {
    type: "FILTERDATECHANGE",
    payload: value,
  };
};

const resetFilterDueDate = () => {
  return {
    type: "FILTERDATERESET",
    payload: null,
  };
};

type ActionType = ReturnType<typeof filterDueDate> | ReturnType<typeof resetFilterDueDate>;

const filterDueDateReducer = (state: number | null = null, action: ActionType) => {
  switch (action.type) {
    case "FILTERDATECHANGE":
      return action.payload;
    case "FILTERDATERESET":
      return action.payload;
    default:
      return state;
  }
};

export { filterDueDate, resetFilterDueDate, filterDueDateReducer };
