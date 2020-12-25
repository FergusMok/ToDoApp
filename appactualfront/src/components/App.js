import React, {useEffect} from 'react'
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import NavigationBar from "./NavigationBar"
import NewItem from "./NewItem"
import HomePage from "./HomePage"


const App = () => {

    return (<>
                <Router>
                <NavigationBar/>
                <br/>
                    <Switch>
                        <Route path = "/incomplete" exact component = {HomePage} />
                        <Route path = "/incomplete/:id" exact component = {NewItem} />
                        <Route path = "/completed" exact component = {HomePage}/>
                        <Route path = "/completed/:id" exact component = {NewItem} />
                        <Route path = "/create" exact component = {NewItem}/>
                    </Switch>
                </Router>
            </>
        );
    }

export default App