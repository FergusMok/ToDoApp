import React from 'react'
import ToDoItem from "./ToDoItem"
import {useDispatch, useSelector} from 'react-redux'
import axios from 'axios'
import {change_db, destroydb} from '../redux/database'

const API_LINK = 'http://localhost:5000//api/v1/items'

const ToDoList = () => {

    const dispatch = useDispatch();

    const getDatabase = async () => {
        const database = await axios.get(API_LINK + ".json")
        dispatch(change_db(database.data.data))
    }

    const deleteEntry = async db => {
        const lastEntryId = db[0].id
        console.log(API_LINK+"/"+lastEntryId)

        await axios.destroy(API_LINK+"/"+lastEntryId)
        getDatabase() // Delete, and re-render the database.
    }

    const currentDatabase = useSelector( state => state.getdestroy )
    const renderDatabase = currentDatabase.map( 
        jsonObject => {
            return (<div key = {jsonObject.id}>
                {jsonObject.title} {jsonObject.body}
            </div>)
        })

    return ( <div>
            <button className="ui button" onClick = {() => getDatabase()}>
                LOAD!
            </button>
            <div className="ui button" tabIndex="0" onClick = {() => deleteEntry(currentDatabase)}>
                 Delete the first entry
            </div>
            <div> {renderDatabase} </div>

            </div>)
}

export default ToDoList