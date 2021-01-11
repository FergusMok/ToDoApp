import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Message } from "semantic-ui-react";
import "../CSS/NewItem.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { onFormSubmitLogin, onFormSubmitRegister } from "../../api/API_AUTHEN";
import { Button, Icon } from "semantic-ui-react";

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

  const moveToOther = isLogin ? (
    <Button fluid onClick={() => history.push("/register")}>
      Don't have an account? Register <Icon name="right arrow" />
    </Button>
  ) : (
    <Button fluid onClick={() => history.push("/login")}>
      Have an account? Login <Icon name="right arrow" />
    </Button>
  );

  return (
    <div className="NewItemBody">
      <form
        onSubmit={(event) =>
          isLogin
            ? onFormSubmitLogin(event, history, setMessage, setVisible, email, password)
            : onFormSubmitRegister(event, history, setMessage, setVisible, email, password, passwordConfirmation, name)
        }
      >
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
        <div style={{ marginLeft: "auto", marginRight: "auto", width: "50vh", marginTop: "4vh" }}>{moveToOther}</div>
      </form>
      {alert}
    </div>
  );
};

export default Login;
