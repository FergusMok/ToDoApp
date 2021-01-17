import { API_LINK_SESSIONS_POSTFIX, API_LINK_REGISTRATIONS_POSTFIX } from "./API_LINK";
import { API_LINK } from "./API_LINK";
import { addName, removeName } from "../redux/userName";
import { addID, removeID } from "../redux/userID";
import { store } from "../redux/combineReducers";

import axios from "axios";

const isLoggedIn = async () => {
  try {
    const response = await axios.get(`${API_LINK}logged_in`, { withCredentials: true });
    if (response.data.logged_in) {
      store.dispatch(addID(response.data.user.id));
      store.dispatch(addName(response.data.user.name));
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err, `${API_LINK}logged_in`);
  }
};

const logOut = (history) => {
  axios
    .delete(`${API_LINK}logout`, { withCredentials: true })
    .then((response) => {
      console.log("You logged me out", response);
      store.dispatch(removeID());
      store.dispatch(removeName());
      history.push("/");
    })
    .catch((err) => console.log("logout", `${API_LINK}logout`));
};

const onFormSubmitLogin = (event, history, setMessage, setVisible, email, password) => {
  event.preventDefault();
  axios
    .post(
      API_LINK_SESSIONS_POSTFIX,
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
        history.push("/incomplete");
        return true;
      } else {
        setMessage("Wrong email and/or password!");
        setVisible(true);
        return false;
      }
    })
    .catch((error) => console.log("Login", error, `${API_LINK}logout`));
};

const onFormSubmitRegister = (event, history, setMessage, setVisible, email, password, passwordConfirmation, name) => {
  event.preventDefault();
  if (password !== passwordConfirmation) {
    setMessage("Passwords do not match!");
    setVisible(true);
  } else {
    axios
      .post(
        API_LINK_REGISTRATIONS_POSTFIX,
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
          history.push("/incomplete");
        }
      })
      .catch((error) => {
        setMessage("Invalid email and/or password!");
        setVisible(true);
        console.log("Register", error);
      });
  }
};

export { isLoggedIn, logOut, onFormSubmitRegister, onFormSubmitLogin };
