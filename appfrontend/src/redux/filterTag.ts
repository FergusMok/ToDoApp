// This is the tags that the person will be selecting
const addTag = (tag: string[]) => {
  return {
    type: "ADDTAGTOFILTER",
    payload: tag,
  };
};

type ActionType = ReturnType<typeof addTag>;

const tagReducer = (state: string[] = [], action: ActionType) => {
  switch (action.type) {
    case "ADDTAGTOFILTER":
      return action.payload;
    default:
      return state;
  }
};

export { addTag, tagReducer };
