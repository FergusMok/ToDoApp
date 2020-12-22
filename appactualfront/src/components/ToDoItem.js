import React from "react"


const ToDoItem = ({item}) => {
    return (
        <div>
         <h3> Article ID : {item.id}</h3>
        <h3>{item.title}</h3>
        <p>{item.body}</p>
       </div>
    )
}

export default ToDoItem