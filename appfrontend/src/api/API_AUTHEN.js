import { API_LINK_ITEMS_POSTFIX } from "./API_LINK";
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
    console.log(err);
  }
};

const logOut = (history) => {
  axios.delete(`${API_LINK}logout`, { withCredentials: true }).then((response) => {
    console.log("You logged me out", response);
    store.dispatch(removeID());
    store.dispatch(removeName());
    history.push("/");
  });
};

const onFormSubmitLogin = (event, history, setMessage, setVisible, email, password) => {
  event.preventDefault();
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
        history.push("/incomplete");
        return true;
      } else {
        setMessage("Wrong email and/or password!");
        setVisible(true);
        return false;
      }
    })
    .catch((error) => {});
};

const onFormSubmitRegister = (event, history, setMessage, setVisible, email, password, passwordConfirmation, name) => {
  event.preventDefault();
  if (password !== passwordConfirmation) {
    setMessage("Passwords do not match!");
    setVisible(true);
  } else {
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
          history.push("/incomplete");
        }
      })
      .catch((error) => {
        setMessage("Invalid email and/or password!");
        setVisible(true);
      });
  }
};

export { isLoggedIn, logOut, onFormSubmitRegister, onFormSubmitLogin };
