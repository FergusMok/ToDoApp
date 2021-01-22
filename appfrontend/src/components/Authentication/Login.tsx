import React, { useState } from "react";
import { Message } from "semantic-ui-react";
import "../CSS/NewItem.css";
import { useHistory, useLocation } from "react-router-dom";
import { onFormSubmitLogin, onFormSubmitRegister } from "../../api/API_AUTHEN";
import { Button, Icon } from "semantic-ui-react";
import { userDetails } from "../../typings";

const Login = () => {
  const location = useLocation();
  console.log(location);
  //// User Details
  const [userDetails, setUserDetails] = useState<userDetails>({
    email: "",
    password: "",
    passwordConfirmation: "",
    name: "",
  });
  const setPassword = (password: string) =>
    setUserDetails((prevState) => {
      return {
        email: prevState.email,
        password: password,
        passwordConfirmation: prevState.passwordConfirmation,
        name: prevState.name,
      };
    });
  const setEmail = (email: string) =>
    setUserDetails((prevState) => {
      return {
        email: email,
        password: prevState.password,
        passwordConfirmation: prevState.passwordConfirmation,
        name: prevState.name,
      };
    });
  const setName = (name: string) =>
    setUserDetails((prevState) => {
      return {
        email: prevState.email,
        password: prevState.password,
        passwordConfirmation: prevState.passwordConfirmation,
        name: name,
      };
    });
  const setConfirmPassword = (passwordConfirmation: string) =>
    setUserDetails((prevState) => {
      return {
        email: prevState.email,
        password: prevState.password,
        passwordConfirmation: passwordConfirmation,
        name: prevState.name,
      };
    });

  //// Alert component
  const [alertState, setAlert] = useState({
    visible: false,
    message: "",
  });

  const closeAlert = () =>
    setAlert((prevState) => {
      return { visible: false, message: prevState.message };
    });

  const setWrongPasswordAlert = (): void => setAlert({ visible: true, message: "Wrong email and/or password!" });
  const setPasswordsDontMatch = (): void => setAlert({ visible: true, message: "Passwords do not match!" });

  const alert = alertState.visible ? (
    <Message onDismiss={() => closeAlert()} negative size="large">
      {alertState.message}
    </Message>
  ) : (
    <> </>
  );

  //// Conditional Rendering Components
  const history = useHistory();
  const isLogin = location.pathname === "/login";

  // Upon logging in, redux will store this person's account ID.
  const nameForm = isLogin ? (
    <> </>
  ) : (
    <label>
      First Name:
      <input
        required
        placeholder="Let us know how to address you"
        onInput={(e) => setName((e.target as HTMLInputElement).value)}
      />
    </label>
  );
  const passwordConfirmationInput = isLogin ? (
    <></>
  ) : (
    <label>
      Password Confirmation:
      <input
        type="password"
        minLength={5}
        required
        placeholder="Confirm your password here"
        onInput={(e) => setConfirmPassword((e.target as HTMLInputElement).value)}
      />
    </label>
  );

  const moveToOther = isLogin ? (
    <Button fluid onClick={() => history.push("/register")}>
      Don't have an account? Register <Icon name="arrow right" />
    </Button>
  ) : (
    <Button fluid onClick={() => history.push("/login")}>
      Have an account? Login <Icon name="arrow right" />
    </Button>
  );

  return (
    <div className="NewItemBodyNonAuthenticated">
      <form
        className="NewItemform"
        onSubmit={(event) =>
          isLogin
            ? onFormSubmitLogin(event, history, setWrongPasswordAlert, userDetails)
            : onFormSubmitRegister(event, history, setWrongPasswordAlert, setPasswordsDontMatch, userDetails)
        }
      >
        <h1> {isLogin ? "Login" : "Register an account!"} </h1>

        <label>
          Email:
          <input
            onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
            required
            minLength={3}
            maxLength={27}
            placeholder="Enter your email here"
          />
        </label>
        {nameForm}

        <label>
          Password:
          <input
            type="password"
            minLength={5}
            required
            placeholder="Enter your password here"
            onInput={(e) => setPassword((e.target as HTMLInputElement).value)}
          />
        </label>
        {passwordConfirmationInput}
        <button type="submit">{isLogin ? "Login" : "Register!"}</button>
        <div style={{ marginLeft: "auto", marginRight: "auto", width: "50vh", marginTop: "4vh" }}>{moveToOther}</div>
      </form>
      {alert}
    </div>
  );
};

export default Login;
