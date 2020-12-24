import React from 'react'
import ToDoList from "./ToDoList"


const Completed = ({match}) => {
    return <>
        <ToDoList match = {match} />
        </>
}

export default Completed