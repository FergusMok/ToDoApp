import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import NewItem from "./NewItem";
import HomePage from "./HomePage";
import Login from "./Authentication/Login";
import AuthenticatedRoutes from "./Authentication/AuthenticatedRoutes";
import NonAuthenticatedRoutes from "./Authentication/NonAuthenticatedRoutes";
import NotFoundPage from "./Authentication/NotFoundPage";
import Welcome from "./WelcomePage.js";
import TestingPage from "./TestingPage.js";

const App = () => {
  return (
    <>
      <Router>
        <NavigationBar />
        <Switch>
          {/* If not logged in, then immediately redirect to login page*/}
          <AuthenticatedRoutes path="/incomplete" exact component={HomePage} />
          <AuthenticatedRoutes path="/completed" exact component={HomePage} />
          <AuthenticatedRoutes path="/incomplete/:id" exact component={NewItem} />
          <AuthenticatedRoutes path="/completed/:id" exact component={NewItem} />
          <AuthenticatedRoutes path="/create" exact component={NewItem} />
          <AuthenticatedRoutes path="/testingpage1" exact component={TestingPage} />
          {/* If logged in, then immediately redirect to inside the application */}
          <NonAuthenticatedRoutes path="/login" exact component={Login} />
          <NonAuthenticatedRoutes path="/register" exact component={Login} />
          {/* Accessible regardless of login status */}
          <Route path="/" exact component={Welcome} />
          <Route path="/:someURL" component={NotFoundPage} />

          <Route path="/testingpage2" exact component={TestingPage} />
          <Route path="/fakeincomplete" exact component={HomePage} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
