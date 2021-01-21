import React, { useEffect, useState } from "react";
import { isLoggedIn } from "../../api/API_AUTHEN";
import { Route, Redirect } from "react-router-dom";
import LoadSpinner from "../LoadSpinner";
import { AuthenticationRouteProp } from "../../typings";

const NonAuthenticatedRoutes = (props) => {
  const { component: Component, ...rest } = props;

  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const loggedInFn = async () => {
      const loggedInBoolean = await isLoggedIn();
      if (typeof loggedInBoolean === "boolean") {
        setLoggedIn(loggedInBoolean);
      }
      setLoading(false);
    };
    loggedInFn();
  }, []);

  const renderAuthenticatedPage = loading ? (
    <LoadSpinner text="Checking if logged in..." />
  ) : (
    <Route render={(props) => (loggedIn ? <Redirect to="/incomplete" /> : <Component match={rest.computedMatch} />)} />
  );
  return renderAuthenticatedPage;
};
export default NonAuthenticatedRoutes;
