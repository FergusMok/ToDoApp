// Actions I will have to do that are easy
// GET, DESTROY ..
import axios from 'axios'

const API_LINK = 'http://localhost:5000//api/v1/items.json'

const change_db = db => {
    return { 
        type:"CHANGEDATABASE",
        payload: db
    }
}

const changeDBReducer = (state = [], action) => {
    switch (action.type) {
        case "CHANGEDATABASE":
            console.log(action.payload)
            return action.payload
            break;

        default:
            console.log("Hello, from default") 
            return state
    }
}


export {change_db, changeDBReducer} 
// Update and destroy will come later, they are more difficult relatively.

