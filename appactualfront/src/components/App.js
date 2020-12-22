import React, {useEffect} from 'react'
import ToDoList from "./ToDoList"
import NavigationBar from "./NavigationBar"

const App = () => {

    return (<div>
                <NavigationBar/> 
                <div><ToDoList/></div>
            </div>
        );
    }

export default App