import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import axios from 'axios'
import {change_db} from '../redux/database'
import ToDoItem from "./ToDoItem"
import { Link } from 'react-router-dom';


const API_LINK = 'http://localhost:5000/api/v1/items'

const ToDoList = ({match}) => {

    const dispatch = useDispatch();

    console.log("Hello this is match",match)
    const activated = useSelector(state => state.navigationState)

    useEffect( () => getDatabase(),[activated])
    const getDatabase = async () => {
        const database = await axios.get(API_LINK + ".json")
        if (match.path === "/incomplete") { 
            dispatch(change_db(database.data.data.filter(item => item.completed == false)))
        } else {
            dispatch(change_db(database.data.data.filter(item => item.completed == true)))
        }
    }


    const currentDatabase = useSelector( state => state.databaseState )

    const renderDatabase = currentDatabase.map( 
        jsonObject => {
            // Check if complete or incomplete. This will render the correct path.
            const pathName = jsonObject.completed ? `/completed/${jsonObject.id}` : `/incomplete/${jsonObject.id}`
            return (
            <div key = {jsonObject.id}>
            <Link to = {pathName}>
                <ToDoItem item = {jsonObject}/>
            </Link>
            </div>
        )})

    return (<div>
            {renderDatabase} 
            </div>)
}

export default ToDoList