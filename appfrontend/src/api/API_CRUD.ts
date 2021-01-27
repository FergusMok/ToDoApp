import { API_LINK_ITEMS_POSTFIX, API_LINK_USERSHOW_POSTFIX } from "./API_LINK";
import axios from "axios";
import { change_db } from "../redux/database";
import { store } from "../redux/combineReducers";
import { History, LocationState } from "history";
import { itemForSubmission, completeItem } from "../typings";
import { FormEvent } from "react";
import { Location } from "history"; // Important, because Location is found on 2 .d.ts. The typescript and history files.

// Get completed or incompleted
const getDatabase = (isCompleted: boolean) => {
  axios
    .get(API_LINK_USERSHOW_POSTFIX, { withCredentials: true })
    .then((resp) =>
      store.dispatch(change_db(resp.data.data.filter((item: completeItem) => item.completed === isCompleted)))
    )
    .catch((errors) => console.log(errors));
};

// There's no way for id to be undefined due to checks, but typescript wont stop prompting.
const markCompletion = async (id: string | undefined, isCompleted: boolean) => {
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

const redirect = (isCompleted: boolean, history: History<LocationState>) => {
  // Redirect once CRUD operaton is done.
  if (isCompleted) {
    // Complete will route back to complete
    history.push("/completed");
  } else {
    // Create and Incomplete should route back to incomplete
    history.push("/incomplete");
  }
};

// There's no way for id to be undefined due to checks, but typescript wont stop prompting.
const deleteEntry = async (id: string | undefined) => {
  // Destroy
  await axios.delete(`${API_LINK_ITEMS_POSTFIX}/${id}`);
};

// Completed defaulted to be false
const onFormSubmit = async (
  event: FormEvent<HTMLFormElement>,
  item: itemForSubmission,
  history: History<LocationState>
) => {
  event.preventDefault();
  const due_date = item.due_date ? item.due_date.toString() : null;
  await axios
    .post(API_LINK_ITEMS_POSTFIX, {
      user_id: item.user_id,
      title: item.title,
      body: item.body,
      due_date,
      tag_list: item.tag_list,
    })
    .then((resp) => {
      console.log(resp);
    })
    .catch((resp) => console.log(resp));
  redirect(false, history);
};

const onFormEdit = async (
  event: FormEvent<HTMLFormElement>,
  objectid: string,
  item: itemForSubmission,
  location: Location<undefined>,
  history: History<LocationState>
) => {
  event.preventDefault();
  const due_date = item.due_date ? item.due_date.toString() : null;
  await axios
    .put(`${API_LINK_ITEMS_POSTFIX}/${objectid}`, {
      // ES15 syntax
      user_id: item.user_id,
      title: item.title,
      body: item.body,
      due_date,
      tag_list: item.tag_list,
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
  const regex = new RegExp("^/completed/[0-9]+$"); // Check if isComplete
  redirect(regex.test(location.pathname), history);
};

export { getDatabase, markCompletion, deleteEntry, onFormEdit, onFormSubmit };
