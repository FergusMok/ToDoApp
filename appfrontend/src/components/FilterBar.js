// This will be a bar, where we can pull all of the tags out.
// I think the processing should be done within Rails 

// Get all of the articles, and then we will 
// parse through all of them to find all of the unique tags
// From there, we can then display them 



// NOT IMPLEMENTED YET
import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import axios from 'axios'

import {change_db} from '../redux/database'
import ToDoItem from "./ToDoItem"
import API_LINK from "../api/API_LINK"
import {GetDatabase} from "../api/API_CRUD"


const FilterBar = () => {
    const currentDatabase = useSelector( state => state.databaseState )
    const [tagss, setTagss] = useState(Set());

    useEffect( () => currentDatabase.map(item => setTagss( Set(...tags, item.tag_list))), [currentDatabase])
    return <div>tags</div>
}