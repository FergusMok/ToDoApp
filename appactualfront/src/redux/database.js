
// Actions I will have to do that are easy
// GET, DESTROY ..
import axios from 'axios'
import {createStore, combineReducers} from 'redux' 

const API_LINK = 'http://localhost:5000//api/v1/items.json'

const change_db = db => {
    return { 
        type:"CHANGE",
        payload: db
    }
}

const destroydb = id => {
    return {
        type:"DESTROY",
        payload: id
    }
}

const getdestroy = (state = [], action) => {
    switch (action.type) {
        case "CHANGE":    
            console.log(action.payload)
            return action.payload
            break;

        default:
            console.log("Hello, from default") 
            return state
    }
}

const store = createStore(combineReducers({
    getdestroy
}))

export {change_db, destroydb, getdestroy, store} 
// Update and destroy will come later, they are more difficult relatively.

