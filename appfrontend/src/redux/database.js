const change_db = db => {
    return { 
        type:"CHANGEDATABASE",
        payload: db
    }
}

const changeDBReducer = (state = [], action) => {
    switch (action.type) {
        case "CHANGEDATABASE":
            return action.payload
        default:
            return state
    }
}


export {change_db, changeDBReducer} 

