import React from 'react'
import ToDoItem from "./ToDoItem"
import {useDispatch, useSelector} from 'react-redux'
import axios from 'axios'
import {change_db, destroydb} from '../redux/database'

const API_LINK = 'http://localhost:5000//api/v1/items.json'

const ToDoList = () => {

    const dispatch = useDispatch();

    const getDatabase = async () => {
        const database = await axios.get(API_LINK)
        dispatch(change_db(database.data.data))
    }

    const renderDatabase = useSelector( state => state.getdestroy ).map( 
        jsonObject => {
            return (<div>
                {jsonObject.title} {jsonObject.body}
            </div>)
        })

    return ( <div>

            <button class="ui button" onClick = {() => getDatabase()}>
                LOAD!
            </button>

            <div class="ui button" tabindex="0">
                 Delete the earliest entry
            </div>
            
            <div> {renderDatabase} </div>

            </div>)
}

export default ToDoList