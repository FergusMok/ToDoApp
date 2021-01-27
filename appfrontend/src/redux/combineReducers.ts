import { createStore, combineReducers } from "redux";
import { changeDBReducer } from "./database";
import { navigateReducer } from "./NavigationBar";
import { tagReducer } from "./filterTag";
import { IDReducer } from "./userID";
import { userNameReducer } from "./userName";
import { sortReducer } from "./sortType";
import { filterDueDateReducer } from "./filterDueDate";
import { filterSearchTextReducer } from "./filterSearchText";
const store = createStore(
  combineReducers({
    databaseState: changeDBReducer,
    navigationState: navigateReducer,
    tagState: tagReducer,
    IDState: IDReducer,
    userNameState: userNameReducer,
    sortState: sortReducer,
    dueDateState: filterDueDateReducer,
    searchTextState: filterSearchTextReducer,
  })
);

export type RootState = ReturnType<typeof store.getState>;
export { store };
