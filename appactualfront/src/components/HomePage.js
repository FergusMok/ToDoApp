import React from 'react'
import ToDoList from "./ToDoList"

const HomePage = ({match}) => {

    return ( <>
        <ToDoList match = {match} />
        </>
    )

}

export default HomePage