import React, {useEffect, useState, useCallback} from 'react'
import {useSelector} from 'react-redux'
import { Dropdown } from 'semantic-ui-react'

const FilterBar = ({match}) => {

    const currentDatabase = useSelector(state => state.databaseState)
    const [tagState, setTags] = useState([]);
    const [currentTag, setCurrentTag] = useState([])
    const isCompleted = useCallback( () => match.path === "/completed", [match] )

    useEffect( () => { // Parse through the available tags, and display them as options
        const refreshFilterBar = () => {
            // Unique tagsList 
            const tagsList = [... new Set(currentDatabase.
                filter(jsonObject => jsonObject.completed === isCompleted() && jsonObject.tag_list.length > 0).
                map(jsonObject => jsonObject.tag_list)) ]
            setTags( tagsList.flat().map( tag => {
                const newObj = {key: tag, text: tag, value: tag} 
                return newObj
            }))
        }
        refreshFilterBar();
    },[currentDatabase] )

    useEffect( () => {
        setCurrentTag([]) // Reset the dropdown animation when change to a new page
    }, [match])

    console.log(currentTag)
    return (
        <Dropdown 
        placeholder='Skills'
        fluid
        multiple
        selection
        options={tagState}
        value = {currentTag}
        onChange={(event, {value}) => {setCurrentTag(value)}}
        />
    )
}

export default FilterBar