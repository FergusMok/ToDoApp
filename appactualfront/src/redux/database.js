
// Actions I will have to do that are easy
// GET, DESTROY ..
import axios from 'axios'
import {createStore, combineReducers} from 'redux' 

const API_LINK = 'http://localhost:5000//api/v1/items.json'

const change_db = db => {
    console.log(db)
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
/*         case "DESTROY":
            console.log("Hello, from destroy")
            const destroy = async () => await axios.destroy(`${API_LINK}+"/"+${action.payload}`).then( resp => console.log(resp) );
            destroy()
        // This should fall through to "GET", and update the state.
        case "GET":
            console.log("Hello, from get")
            const get = async () => await axios.get(API_LINK).then( resp => resp.data)
            return get()
            break;
 */            
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

