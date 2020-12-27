import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import axios from 'axios'
import { XMasonry, XBlock } from "react-xmasonry"

import {change_db} from '../redux/database'
import ToDoItem from "./ToDoItem"
import API_LINK from "../api/API_LINK"

import './ToDoList.css'
const ToDoList = ({match}) => {

    const dispatch = useDispatch();

    console.log("Hello this is match",match)
    const activated = useSelector(state => state.navigationState)
    
    const getDatabase = async () => {
        const database = await axios.get(API_LINK + ".json")
        if (match.path === "/incomplete") { 
            dispatch(change_db(database.data.data.filter(item => item.completed === false)))
        } else {
            dispatch(change_db(database.data.data.filter(item => item.completed === true)))
        }
    }

    useEffect( () => getDatabase() ,[activated] )
    


    const currentDatabase = useSelector( state => state.databaseState )

    // This has very high complexity.
    const renderDatabase = currentDatabase.sort( (a,b) => new Date(b.updated_at) - new Date(a.updated_at)).map( 
        jsonObject => {
            const pathName = jsonObject.completed ? `/completed/${jsonObject.id}` : `/incomplete/${jsonObject.id}`
            // Check if complete or incomplete. This will render the correct path.
            return (    
             <XBlock key = {jsonObject.id} >
               <div className = "XMasonryCard">
                        <ToDoItem item = {jsonObject} path = {pathName} getDatabase = {() => getDatabase()} />
                </div>
             </XBlock>
            )
        }
    )

    return (<XMasonry maxColumns = {4}>
            {renderDatabase} 
            </XMasonry>)
}

export default ToDoList