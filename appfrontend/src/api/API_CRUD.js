import React from 'react'
import API_LINK from "./API_LINK"
import axios from "axios"
import {change_db} from '../redux/database'
import {store} from '../redux/combineReducers'

import AlertBar from './AlertBar'

// Get completed or incompleted
const getDatabase = async (isCompleted) => {
    const database = await axios.get(API_LINK + ".json")
    store.dispatch(change_db(database.data.data.filter(item => item.completed === isCompleted)))
}
 
const markCompletion = async (id, isCompleted) => { // Put request to mark complete
    await axios.put(`${API_LINK}/${id}`, {
        completed: !isCompleted ,
    }).then(resp => {
        console.log(resp)
    }).catch(resp => console.log(resp))
        getDatabase(isCompleted)
}

const redirect = (match) => { // Redirect once CRUD operaton is done. 
    const isNewItem = (match.path === "/create")
    const isCompleted = (match.path === "/completed/:id")
    if (isCompleted) { // Complete will route back to complete
        window.location.href = "/completed"
    } else { // Create and Incomplete should route back to incomplete 
        console.log(isNewItem, isCompleted, match.path)
/*         if (isNewItem) {
            console.log("Redirect and change the nav bar")
            store.dispatch(navigate("Incomplete"))
        }
 */        window.location.href = "/incomplete"
    }
}

const deleteEntry = async (id) => { // Destroy
    await axios.delete(`${API_LINK}/${id}`)
}

// Completed defaulted to be false 
const onFormSubmit = async (event, title, body, tag_list, match) => {
    event.preventDefault();
    await axios.post(API_LINK, {
        title,
        body,
        tag_list
    }).then(resp => {
        console.log(resp)
    }).catch(resp => console.log(resp))
     redirect(match)
}

const onFormEdit = async (event, id, title, body, tag_list, match) => {
    console.log("Edit called")
    event.preventDefault();
    console.log(tag_list)
    await axios.put(`${API_LINK}/${id}`, {
        // ES15 syntax
        title,
        body,
        tag_list
    }).then(resp => {
        console.log(resp)
    }).catch(error => {
        if (error.response) {
            console.log("Data",error.response.data);
        } else {
            console.log("Error",error)
        }
    })
    redirect(match)
}

export {getDatabase, markCompletion, deleteEntry, onFormEdit, onFormSubmit}