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
        if (match.path === "/") {
            dispatch(change_db(database.data.data.filter(item => item.completed == false)))
        } else {
            dispatch(change_db(database.data.data.filter(item => item.completed == true)))
        }
    }

    const deleteEntry = async db => {
        const lastEntry = db[0]
        await axios.delete(API_LINK+"/"+lastEntry.id, lastEntry)
        getDatabase() // Delete, and re-render the database.
    }

    const currentDatabase = useSelector( state => state.databaseState )
    const renderDatabase = currentDatabase.map( 
        jsonObject => {
            return (
            <div key = {jsonObject.id}>
            <Link to = {`/create/${jsonObject.id}`}>
                <ToDoItem item = {jsonObject}/>
            </Link>
            </div>
        )})

    return (<div>
{/*             <button className="ui button" onClick = {() => getDatabase()}>
                LOAD!
            </button>
           <div className="ui button" tabIndex="0" onClick = {() => deleteEntry(currentDatabase)}>
                 Delete the first entry
            </div>
*/}  
            <div> {renderDatabase} </div>
            </div>)
}

export default ToDoList