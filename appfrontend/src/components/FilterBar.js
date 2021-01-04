
// NOT IMPLEMENTED YET
import React, {useEffect, useState, useCallback} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Dropdown } from 'semantic-ui-react'

const FilterBar = ({match}) => {

    const currentDatabase = useSelector(state => state.databaseState)
    const [tagState, setTags] = useState([]);
    const [currentTag, setCurrentTag] = useState([])

    const isCompleted = match.path === "/completed"

    useEffect( () => {
        const refreshFilterBar = async () => {
            // Unique tagsList 
            const tagsList = [... new Set(currentDatabase.
                filter(jsonObject => jsonObject.completed === isCompleted && jsonObject.tag_list.length > 0).
                map(jsonObject => jsonObject.tag_list)) ]
            
            setTags( tagsList.flat().map( tag => {
                const newObj = {key: tag, text: tag, value: tag} 
                return newObj
            }))
        }
        refreshFilterBar();
    },[currentDatabase] )
    
    return (
        <Dropdown 
        placeholder='Skills' 
        fluid 
        multiple 
        selection 
        options={tagState} 
        onChange={(event, {value}) => {setCurrentTag(value)}}
        />
    )
}

export default FilterBar