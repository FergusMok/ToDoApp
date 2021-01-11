import React from "react";
import { API_LINK, API_LINK_ITEMS_POSTFIX } from "./API_LINK";
import axios from "axios";
import { change_db } from "../redux/database";
import { store } from "../redux/combineReducers";

// Get completed or incompleted
const getDatabase = (isCompleted) => {
  const database = axios
    .get("http://localhost:5000/api/v1/specialshow", { withCredentials: true })
    .then((resp) => store.dispatch(change_db(resp.data.data.filter((item) => item.completed === isCompleted))))
    .catch((errors) => console.log(errors));
};

// I split the tags because it's much faster (hypothetically half), especially if we have alot of tags.

const markCompletion = async (id, isCompleted) => {
  // Put request to mark complete
  await axios
    .put(`${API_LINK_ITEMS_POSTFIX}/${id}`, {
      completed: !isCompleted,
    })
    .then((resp) => {
      console.log(resp);
    })
    .catch((resp) => console.log(resp));
  getDatabase(isCompleted);
};

const redirect = (match, history) => {
  // Redirect once CRUD operaton is done.
  const isNewItem = match.path === "/create";
  const isCompleted = match.path === "/completed/:id";
  if (isCompleted) {
    // Complete will route back to complete
    history.push("/completed");
  } else {
    // Create and Incomplete should route back to incomplete
    console.log(isNewItem, isCompleted, match.path);
    history.push("/incomplete");
  }
};

const deleteEntry = async (id) => {
  // Destroy
  await axios.delete(`${API_LINK_ITEMS_POSTFIX}/${id}`);
};

// Completed defaulted to be false
const onFormSubmit = async (event, user_id, title, body, tag_list, match, history) => {
  event.preventDefault();
  console.log("userid, title, body, tag_list", user_id, title, body, tag_list);
  await axios
    .post(API_LINK_ITEMS_POSTFIX, {
      user_id,
      title,
      body,
      tag_list,
    })
    .then((resp) => {
      console.log(resp);
    })
    .catch((resp) => console.log(resp));
  redirect(match, history);
};

const onFormEdit = async (event, user_id, id, title, body, tag_list, match, history) => {
  console.log("Edit called");
  event.preventDefault();
  console.log(tag_list);
  await axios
    .put(`${API_LINK_ITEMS_POSTFIX}/${id}`, {
      // ES15 syntax
      user_id,
      title,
      body,
      tag_list,
    })
    .then((resp) => {
      console.log(resp);
    })
    .catch((error) => {
      if (error.response) {
        console.log("Data", error.response.data);
      } else {
        console.log("Error", error);
      }
    });
  redirect(match, history);
};

export { getDatabase, markCompletion, deleteEntry, onFormEdit, onFormSubmit };
