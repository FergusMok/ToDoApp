import {createStore, combineReducers} from 'redux' 
import {changeDBReducer} from "./database"
import {navigateReducer} from "./NavigationBar"

const store = createStore(combineReducers({
    databaseState: changeDBReducer,
    navigationState: navigateReducer
}))

export {store} 