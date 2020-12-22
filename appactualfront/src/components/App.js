import React, {useEffect} from 'react'
import ToDoItem from "./ToDoItem"
import ToDoList from "./ToDoList"


const App = () => {

    return (<div>
{/*        <div onClick = {() => dispatch(destroydb(databaseArray.length - 1))}> Click me to destroy the oldest entry! Hahaha!</div>
 */}           <div><ToDoList/></div>
            </div>
        );
    }

export default App