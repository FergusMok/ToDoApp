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
      console.log("RESPONSE FROM ISLOGGEDIN IS TRUE!!!");
      return true;
    } else {
      console.log("RESPONSE FROM ISLOGGEDIN IS FALSE!!!");
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

export { isLoggedIn, logOut };
