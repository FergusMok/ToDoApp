import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import NewItem from "./NewItem";
import HomePage from "./HomePage";
import Login from "./Authentication/Login";
import AuthenticatedRoutes from "./Authentication/AuthenticatedRoutes";
import NotFoundPage from "./Authentication/NotFoundPage";
import Welcome from "./WelcomePage.js";
import TestingPage from "./TestingPage.js";

const App = () => {
  return (
    <>
      <Router>
        <NavigationBar />
        <Switch>
          <AuthenticatedRoutes path="/incomplete" exact component={HomePage} />
          <AuthenticatedRoutes path="/completed" exact component={HomePage} />
          <AuthenticatedRoutes path="/incomplete/:id" exact component={NewItem} />
          <AuthenticatedRoutes path="/completed/:id" exact component={NewItem} />
          <AuthenticatedRoutes path="/create" exact component={NewItem} />
          <AuthenticatedRoutes path="/testingpage1" exact component={TestingPage} />
          <Route path="/testingpage2" exact component={TestingPage} />
          <Route path="/fakeincomplete" exact component={HomePage} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Login} />
          <Route path="/" exact component={Welcome} />
          <Route path="/:someURL" component={NotFoundPage} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
