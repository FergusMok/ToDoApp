import React, { useEffect, useState } from "react";
import { isLoggedIn } from "../../api/API_AUTHEN";
import { Route, Redirect } from "react-router-dom";
import LoadSpinner from "../LoadSpinner";
import { AuthenticationRouteProp } from "../../typings";

const NonAuthenticatedRoutes = ({ component: Component }: AuthenticationRouteProp) => {
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
    <Route render={(props) => (loggedIn ? <Redirect to="/incomplete" /> : <Component />)} />
  );
  return renderAuthenticatedPage;
};
export default NonAuthenticatedRoutes;
