import { createStore, combineReducers } from "redux";
import { changeDBReducer } from "./database";
import { navigateReducer } from "./NavigationBar";
import { tagReducer } from "./tagFilter";
import { IDReducer } from "./userID";
import { userNameReducer } from "./userName";

const store = createStore(
  combineReducers({
    databaseState: changeDBReducer,
    navigationState: navigateReducer,
    tagState: tagReducer,
    IDState: IDReducer,
    userNameState: userNameReducer,
  })
);

export { store };
