import React from "react"
import { Checkbox } from 'semantic-ui-react'


const ToDoItem = ({item}) => {
    return (
        <div>
        <h3> Article ID : {item.id}</h3>
        <h3>{item.title}</h3>
        <Checkbox label='Completed?' />
        <p>{item.body}</p>
       </div>
    )
}

export default ToDoItem