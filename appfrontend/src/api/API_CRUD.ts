import { API_LINK_ITEMS_POSTFIX, API_LINK_USERSHOW_POSTFIX } from "./API_LINK";
import axios from "axios";
import { change_db } from "../redux/database";
import { store } from "../redux/combineReducers";
import { History, LocationState } from "history";
import { itemForSubmission, completeItem, MatchProps } from "../typings";
import { FormEvent } from "react";

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

const redirect = (match: MatchProps["match"], history: History<LocationState>) => {
  // Redirect once CRUD operaton is done.
  const isCompleted = match.path === "/completed/:id";
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
  match: MatchProps["match"],
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
  redirect(match, history);
};

const onFormEdit = async (
  event: FormEvent<HTMLFormElement>,
  objectid: string | undefined, // There's no way for id to be undefined due to checks, but typescript wont stop prompting.
  item: itemForSubmission,
  match: MatchProps["match"],
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
  redirect(match, history);
};

export { getDatabase, markCompletion, deleteEntry, onFormEdit, onFormSubmit };
