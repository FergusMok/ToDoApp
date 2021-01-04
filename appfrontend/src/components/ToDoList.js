import React, {useCallback, useEffect} from 'react'
import { useSelector } from 'react-redux'
import { XMasonry, XBlock } from "react-xmasonry"

import ToDoItem from "./ToDoItem"
import {getDatabase} from "../api/API_CRUD"
import './CSS/ToDoList.css'

const ToDoList = ( {match}) => {
    const activated = useSelector(state => state.navigationState)
    const currentDatabase = useSelector(state => state.databaseState)
    const currentTag = useSelector(state => state.tagState)


    useEffect( () => {
        getDatabase(match.path !== "/incomplete")
    } ,[activated] )
    
    const filterBasedOnTag = (jsonObject) => {
        // If currentTag is not empty, then we will filter based on currentTag
        if (currentTag.length > 0) { 
            if ( jsonObject.tag_list.filter(e => currentTag.indexOf(e) !== -1).length > 0) {
                return true
            } else {
                return false
            }
        } else { // If currentTag is empty, then no filter is applied
            return true
        }
    }

    // This has very high complexity, may bottleneck here.
    const renderDatabase = currentDatabase.filter(x => filterBasedOnTag(x)).
    sort( (a,b) => new Date(b.updated_at) - new Date(a.updated_at)).
    map( jsonObject => {
            return (    
             <XBlock key = {jsonObject.id} >
               <div className = "XMasonryCard">
                        <ToDoItem item = {jsonObject} />
                </div>
             </XBlock>
        )})
    
    // If renderDatabase is loading, we'll need buffer some things first right
    const displayDatabase = useCallback(() => {
        if (renderDatabase !== []) {
            return <XMasonry maxColumns = {4}>
                    {renderDatabase}
                    </XMasonry>
        } else {
            return <div>"LOADING..."</div>
        }
    }, [currentTag, renderDatabase])

    return displayDatabase()
}

export default ToDoList