import {createStore, combineReducers} from 'redux' 
import {changeDBReducer} from "./database"
import {navigateReducer} from "./NavigationBar"
import {tagReducer} from './tagFilter'

const store = createStore(combineReducers({
    databaseState: changeDBReducer,
    navigationState: navigateReducer,
    tagState: tagReducer
}))

export {store} 