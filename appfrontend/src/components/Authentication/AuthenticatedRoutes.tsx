import React, { useEffect, useState } from "react";
import { isLoggedIn } from "../../api/API_AUTHEN";
import { Route, Redirect } from "react-router-dom";
import LoadSpinner from "../LoadSpinner";
import NavigationBar from "../NavigationBar";

const AuthenticatedRoutes = ({ component: Component, ...rest }) => {
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
    <LoadSpinner text="Authenticating..." />
  ) : (
    <Route
      render={(props) =>
        loggedIn ? (
          <>
            <NavigationBar />
            <Component match={rest.computedMatch} />
          </>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
  return renderAuthenticatedPage;
};
export default AuthenticatedRoutes;
