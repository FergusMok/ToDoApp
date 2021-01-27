const filterSearchText = (value: string) => {
  return {
    type: "FILTERSEARCHTEXT",
    payload: value,
  };
};

const resetSearchText = () => {
  return {
    type: "RESETSEARCHTEXT",
    payload: "",
  };
};

type ActionType = ReturnType<typeof filterSearchText> | ReturnType<typeof resetSearchText>;

const filterSearchTextReducer = (state: string = "", action: ActionType) => {
  switch (action.type) {
    case "FILTERSEARCHTEXT":
      return action.payload;
    case "RESETSEARCHTEXT":
      return action.payload;
    default:
      return state;
  }
};

export { filterSearchText, resetSearchText, filterSearchTextReducer };
