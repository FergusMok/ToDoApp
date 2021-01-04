// This is the tags that the person will be selecting

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
            return action.payload
        case 'REOMVETAGTOFILTER':
            return action.payload
        default:
            return state
    }
}

export {addTag, removeTag, tagReducer}