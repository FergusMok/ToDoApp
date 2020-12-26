import React from 'react'
import ToDoList from "./ToDoList"
import "./HomePage.css"


const HomePage = ({match}) => {

    return ( <>
        <ToDoList match = {match} />
        </>
    )

}

export default HomePage