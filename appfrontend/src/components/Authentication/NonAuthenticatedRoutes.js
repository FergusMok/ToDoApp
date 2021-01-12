import React, { useEffect, useState } from "react";
import { isLoggedIn } from "../../api/API_AUTHEN";
import { Route, Redirect } from "react-router-dom";

const NonAuthenticatedRoutes = ({ component: Component, ...rest }) => {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const loggedInFn = async () => {
      const loggedInBoolean = await isLoggedIn();
      setLoggedIn(loggedInBoolean);
      setLoading(false);
    };
    loggedInFn();
  }, []);

  const renderAuthenticatedPage = loading ? (
    <> SPIN SPIN SPIN! </>
  ) : (
    <Route render={(props) => (loggedIn ? <Redirect to="/incomplete" /> : <Component match={rest.computedMatch} />)} />
  );
  return renderAuthenticatedPage;
};
export default NonAuthenticatedRoutes;
