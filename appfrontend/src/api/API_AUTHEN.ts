import { API_LINK_SESSIONS_POSTFIX, API_LINK_REGISTRATIONS_POSTFIX } from "./API_LINK";
import { API_LINK } from "./API_LINK";
import { addName, removeName } from "../redux/userName";
import { addID, removeID } from "../redux/userID";
import { store } from "../redux/combineReducers";
import { History, LocationState } from "history";
import axios from "axios";
import { userDetails } from "../typings";
import { FormEvent } from "react";

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

const logOut = (history: History<LocationState>) => {
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

const onFormSubmitLogin = (
  event: FormEvent<HTMLFormElement>,
  history: History<LocationState>,
  setWrongPasswordAlert: () => void,
  userDetails: userDetails
) => {
  event.preventDefault();
  axios
    .post(
      API_LINK_SESSIONS_POSTFIX,
      {
        user: {
          email: userDetails.email.toLowerCase(),
          password: userDetails.password,
        },
      },
      { withCredentials: true }
    )
    .then((response) => {
      if (response.data.logged_in) {
        history.push("/incomplete");
        return true;
      } else {
        setWrongPasswordAlert();
        return false;
      }
    })
    .catch((error) => console.log("Login", error, `${API_LINK}logout`));
};

const onFormSubmitRegister = (
  event: FormEvent<HTMLFormElement>,
  history: History<LocationState>,
  setWrongPasswordAlert: () => void,
  setPasswordsDontMatch: () => void,
  userDetails: userDetails
) => {
  event.preventDefault();
  if (userDetails.password !== userDetails.passwordConfirmation) {
    setPasswordsDontMatch();
  } else {
    axios
      .post(
        API_LINK_REGISTRATIONS_POSTFIX,
        {
          user: {
            email: userDetails.email.toLowerCase(),
            name: userDetails.name,
            password: userDetails.password,
            password_confirmation: userDetails.passwordConfirmation,
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
        setWrongPasswordAlert();
        console.log("Register", error);
      });
  }
};

export { isLoggedIn, logOut, onFormSubmitRegister, onFormSubmitLogin };
