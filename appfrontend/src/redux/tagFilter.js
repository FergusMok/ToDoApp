const addTag = (tag) => {
    return {
        type: "ADDTAGTOFILTER",
        payload: tag
    }
}

const removeTag = (tag) => {
    return {
        type: "REOMVETAGTOFILTER",
        payload: tag
    }
}

const tagReducer = (state = [], action) => {
    switch(action.type) {
        case 'ADDTAGTOFILTER':
            return [...state, action.payload]
        case 'REOMVETAGTOFILTER':
            return state.filter( tag => tag !== action.payload)
        default:
            return state
    }
}

export {addTag, removeTag, tagReducer}