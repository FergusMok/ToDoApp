const navigate = dest => {
    return {
        type: "CHANGENAVIGATION",
        payload: dest
    }
}

const navigateReducer = (state = "Home", action) => {
    switch(action.type) {
        case "CHANGENAVIGATION":
            return action.payload
        default:
            return state
    }
}
export {navigate, navigateReducer}