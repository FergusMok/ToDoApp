import React from "react"


const ToDoItem = ({id, title, body}) => {
    return (
        <div>
        <h3> Article ID : {id}</h3>
        <h3>{title}</h3>
        <p>{body}</p>
        </div>
    )
}

export default ToDoItem