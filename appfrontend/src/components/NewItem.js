import React, { useState, useEffect, useCallback } from "react";
import { Dropdown } from "semantic-ui-react";
import axios from "axios";
import { API_LINK_ITEMS_POSTFIX } from "../api/API_LINK";
import "./CSS/NewItem.css";
import { markCompletion, deleteEntry, onFormEdit, onFormSubmit } from "../api/API_CRUD";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

const NewItem = ({ match }) => {
  // Title and body can be converted 1 state, but flattened so as to prevent double re-rendering.
  const [titleState, setTitle] = useState("");
  const [bodyState, setBody] = useState("");
  const userID = useSelector((state) => state.IDState);

  // The tagInputBar requires 2 states to work.
  const [tagState, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState([]);

  const history = useHistory();
  const isNewItem = useCallback(() => match.path === "/create", [match]);
  const isCompleted = useCallback(() => match.path === "/completed/:id", [match]);

  useEffect(() => {
    // Fills up the form for put request.
    const refreshArticle = async () => {
      if (!isNewItem()) {
        console.log("Im here!");
        const itemDetails = await axios.get(`${API_LINK_ITEMS_POSTFIX}/${match.params.id}`);
        setTitle(itemDetails.data.data.title);
        setBody(itemDetails.data.data.body);
        // Parse the tags, and set them to the tagState
        setTags(
          itemDetails.data.data.tag_list.map((tag) => {
            const newObj = { key: tag, text: tag, value: tag };
            return newObj;
          })
        );
        setCurrentTag(itemDetails.data.data.tag_list);
      } else {
        // Resets state, if user changes from edit to create via navBar.
        setTitle("");
        setBody("");
        setTags("");
      }
    };
    refreshArticle();
  }, [match.path]);

  // Conditional rendering of the buttons
  const submitEditButton = <button type="submit">{isNewItem() ? "Submit" : "Edit"}</button>;
  const deleteButton = isNewItem() ? (
    <></>
  ) : (
    <button onClick={() => deleteEntry(match.params.id, match)}> {"Delete"} </button>
  );
  // Double ternary
  const completeIncompleteButton = isNewItem() ? (
    <></>
  ) : isCompleted() ? (
    <button onClick={() => markCompletion(match.params.id, true)}>{"Mark as Incomplete"}</button>
  ) : (
    <button onClick={() => markCompletion(match.params.id, false)}>{"Mark as Complete"}</button>
  );

  return (
    <div className="NewItemBody">
      <form
        onSubmit={(event) =>
          isNewItem()
            ? onFormSubmit(event, userID, titleState, bodyState, currentTag.toString(), match, history)
            : onFormEdit(event, userID, match.params.id, titleState, bodyState, currentTag.toString(), match, history)
        }
      >
        <h1> {isNewItem() ? "Create new item!" : "Edit item!"} </h1>
        <label>
          Title:
          <input
            value={titleState}
            onInput={(e) => setTitle(e.target.value)}
            required
            minLength="3"
            maxLength="27"
            placeholder="Item Title, e.g Go surfing at 6pm"
          />
        </label>
        <label>
          Body:
          <textarea
            value={bodyState}
            onInput={(e) => setBody(e.target.value)}
            required
            minLength="5"
            maxLength="300"
            placeholder="Item Body, e.g Remember to book tickets to Hawaii"
          />
        </label>
        <Dropdown
          options={tagState}
          placeholder="Tags!"
          multiple
          search
          selection
          fluid
          allowAdditions
          value={currentTag}
          onAddItem={(event, { value }) => {
            setTags((prevState) => [{ text: value, value }, ...prevState]);
          }}
          onChange={(event, { value }) => {
            setCurrentTag(value);
          }}
        />
        {submitEditButton}
        {deleteButton}
        {completeIncompleteButton}
      </form>
    </div>
  );
};

export default NewItem;
