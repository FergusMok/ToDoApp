import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Message } from "semantic-ui-react";
import "../CSS/NewItem.css";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Login = ({ match }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const history = useHistory();

  const isLogin = match.path === "/login";

  // Upon logging in, redux will store this person's account ID.
  const onFormSubmitLogin = (event) => {
    event.preventDefault();
    console.log("Submitted");
    axios
      .post(
        "http://localhost:5000/api/v1/sessions",
        {
          user: {
            email: email.toLowerCase(),
            password: password,
          },
        },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.data.logged_in) {
          console.log(response);
          console.log("Logged in yo!", response.data.logged_in);
          history.push("/incomplete");
          return true;
        } else {
          setMessage("Wrong email and/or password!");
          setVisible(true);
          console.log("Not logged in ", response);
          return false;
        }
      })
      .catch((error) => {
        console.log("login error", error);
      });
  };

  const onFormSubmitRegister = (event) => {
    event.preventDefault();

    if (password !== passwordConfirmation) {
      console.log(password, passwordConfirmation);
      setMessage("Passwords do not match!");
      setVisible(true);
    } else {
      console.log("Submitted Register");
      console.log(email, name, password, passwordConfirmation);
      axios
        .post(
          "http://localhost:5000/api/v1/registrations",
          {
            user: {
              email: email.toLowerCase(),
              name: name,
              password: password,
              password_confirmation: passwordConfirmation,
            },
          },
          { withCredentials: true }
        )
        .then((response) => {
          if (response.data.status === "created") {
            console.log("Logged in yo!");
            history.push("/incomplete");
          }
        })
        .catch((error) => {
          setMessage("Invalid email and/or password!");
          setVisible(true);
          console.log("login error", error);
        });
    }
  };

  const nameForm = isLogin ? (
    <> </>
  ) : (
    <label>
      First Name:
      <input required placeholder="Let us know how to address you" onInput={(e) => setName(e.target.value)} />
    </label>
  );
  const passwordConfirmationInput = isLogin ? (
    <></>
  ) : (
    <label>
      Password Confirmation:
      <input
        type="password"
        minLength="5"
        required
        placeholder="Confirm your password here"
        onInput={(e) => setConfirmPassword(e.target.value)}
      />
    </label>
  );
  const alert = visible ? (
    <Message onDismiss={() => setVisible(false)} negative size="large">
      {message}
    </Message>
  ) : (
    <> </>
  );

  return (
    <div className="NewItemBody">
      <form onSubmit={isLogin ? onFormSubmitLogin : onFormSubmitRegister}>
        <h1> {isLogin ? "Login" : "Register an account!"} </h1>
        <label>
          Email:
          <input
            onInput={(e) => setEmail(e.target.value)}
            required
            minLength="3"
            maxLength="27"
            placeholder="Enter your email here"
          />
        </label>
        {nameForm}

        <label>
          Password:
          <input
            type="password"
            minLength="5"
            required
            placeholder="Enter your password here"
            onInput={(e) => setPassword(e.target.value)}
          />
        </label>
        {passwordConfirmationInput}

        <button type="submit">{isLogin ? "Login" : "Register!"}</button>
      </form>
      {alert}
    </div>
  );
};

export default Login;
