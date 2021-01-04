import React from 'react'
import ToDoList from "./ToDoList"
import "./CSS/HomePage.css"
import { Segment } from 'semantic-ui-react'
import FilterBar from "./FilterBar"


const HomePage = ({match}) => {
    return ( 
    <div>
    <FilterBar match = {match} />
    <ToDoList match = {match} />

    </div>

/*      For a future implementation:
           <div id="outer-container">
            <div id="sidebar"><Sticky offset={40}><Sidebar/></Sticky></div>
            <div id="content"><ToDoList match = {match} /></div>
        </div>
 */    )

}

export default HomePage