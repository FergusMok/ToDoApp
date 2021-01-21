import { completeItem } from "../typings";

const change_db = (db: completeItem[]) => {
  return {
    type: "CHANGEDATABASE",
    payload: db,
  };
};

type ActionType = ReturnType<typeof change_db>;

const changeDBReducer = (state: completeItem[] = [], action: ActionType) => {
  switch (action.type) {
    case "CHANGEDATABASE":
      return action.payload;
    default:
      return state;
  }
};

export { change_db, changeDBReducer };
