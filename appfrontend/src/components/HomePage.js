import React from 'react'
import ToDoList from "./ToDoList"
import "./HomePage.css"
  
const HomePage = ({match}) => {
    return ( <ToDoList match = {match} />

/*      For a future implementation:
           <div id="outer-container">
            <div id="sidebar"><Sticky offset={40}><Sidebar/></Sticky></div>
            <div id="content"><ToDoList match = {match} /></div>
        </div>
 */    )

}

export default HomePage