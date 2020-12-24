import React, {useEffect} from 'react'
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import NavigationBar from "./NavigationBar"
import NewItem from "./NewItem"
import HomePage from "./HomePage"


const App = () => {

    return (<>
                <Router>
                <NavigationBar/>
                    <Switch>
                        <Route path = "/" exact component = {HomePage} />
                        <Route path = "/completed" exact component = {HomePage}/>
                        <Route path = "/create" exact component = {NewItem}/>
                        <Route path = "/create/:id" exact component = {NewItem} />
                    </Switch>
                </Router>
            </>
        );
    }

export default App