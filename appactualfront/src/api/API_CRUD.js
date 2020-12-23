import React from 'react'
import axios from 'axios'
import API_LINK from './API_LINK'
import { useDispatch } from 'react-redux'
import {change_incomplete_db, change_complete_db} from '../redux/database'





const DeleteEntry = async db => {
    console.log("Delete is running!", db)
    const lastEntry = db[0]
    await axios.delete(API_LINK+"/"+lastEntry.id, lastEntry)
    GetIncompleteDatabase() // Delete, and re-render the database.
}


export { DeleteEntry }