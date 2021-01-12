// This is the tags that the person will be selecting

const addTag = (tag) => {
  return {
    type: "ADDTAGTOFILTER",
    payload: tag,
  };
};

const tagReducer = (state = [], action) => {
  switch (action.type) {
    case "ADDTAGTOFILTER":
      return action.payload;
    default:
      return state;
  }
};

export { addTag, tagReducer };
