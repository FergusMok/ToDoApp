import React, {useEffect} from 'react'
import { useSelector } from 'react-redux'
import { XMasonry, XBlock } from "react-xmasonry"

import ToDoItem from "./ToDoItem"
import {getDatabase} from "../api/API_CRUD"
import './CSS/ToDoList.css'

const ToDoList = ({match}) => {
    const activated = useSelector(state => state.navigationState)
    const currentDatabase = useSelector(state => state.databaseState)

    useEffect( () => {
        getDatabase(match.path !== "/incomplete")
    } ,[activated] )
    
    // This has very high complexity, may bottleneck here.
    const renderDatabase = currentDatabase.sort( (a,b) => new Date(b.updated_at) - new Date(a.updated_at)).map( 
        jsonObject => {
            // Pathname prop
            const pathName = jsonObject.completed ? `/completed/${jsonObject.id}` : `/incomplete/${jsonObject.id}`
            return (    
             <XBlock key = {jsonObject.id} >
               <div className = "XMasonryCard">
                        <ToDoItem item = {jsonObject} path = {pathName} />
                </div>
             </XBlock>
        )})
    return (<XMasonry maxColumns = {4}>
            {renderDatabase} 
            </XMasonry>)
}

export default ToDoList