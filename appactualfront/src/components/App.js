import React, {useEffect} from 'react'
import ToDoList from "./ToDoList"
import NavigationBar from "./NavigationBar"
import NewItem from "./NewItem"

const App = () => {

    return (<div>
                <NavigationBar/>
                <div className = "container"> <NewItem/> </div>
                <ToDoList/>
            </div>
        );
    }

export default App