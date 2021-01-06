import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import NewItem from "./NewItem";
import HomePage from "./HomePage";
import Login from "./Authentication/Login";

const App = () => {
  return (
    <>
      <Router>
        <NavigationBar />
        <Switch>
          <Route path="/incomplete" exact component={HomePage} />
          <Route path="/incomplete/:id" exact component={NewItem} />
          <Route path="/completed" exact component={HomePage} />
          <Route path="/completed/:id" exact component={NewItem} />
          <Route path="/create" exact component={NewItem} />
          <Route path="/login" exact component={Login} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
