import React, { useState, useEffect, useCallback } from "react";
import { Dropdown } from "semantic-ui-react";
import axios from "axios";
import { API_LINK_ITEMS_POSTFIX } from "../api/API_LINK";
import "./CSS/NewItem.css";
import { markCompletion, deleteEntry, onFormEdit, onFormSubmit } from "../api/API_CRUD";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import "react-datetime/css/react-datetime.css";
import Datetime from "react-datetime";
import moment from "moment";
import LoadSpinner from "./LoadSpinner";

const NewItem = ({ match }) => {
  // Title and body can be converted 1 state, but flattened so as to prevent double re-rendering.
  const [titleState, setTitle] = useState("");
  const [bodyState, setBody] = useState("");
  const userID = useSelector((state) => state.IDState);

  // The tagInputBar requires 2 states to work.
  const [tagState, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState([]);

  //
  const loadingtext = "Fetching your information..";
  const [loading, setLoading] = useState(true);

  const history = useHistory();
  const isNewItem = useCallback(() => match.path === "/create", [match]);
  const isCompleted = useCallback(() => match.path === "/completed/:id", [match]);

  // Calendar-related var
  var inputProps = { placeholder: "Due date" };
  const [calendarDate, setCalendarDate] = useState(""); // Returns as a date-time object
  var yesterday = moment().subtract(1, "day");
  var valid = function (current) {
    return current.isAfter(yesterday);
  };

  useEffect(() => {
    // Fills up the form for put request.
    const refreshArticle = async () => {
      if (!isNewItem()) {
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
        if (itemDetails.data.data.due_date) {
          console.log(itemDetails.data.data.due_date);
          setCalendarDate(new Date(itemDetails.data.data.due_date));
        } else {
          // Leave it default ""
        }
        setCurrentTag(itemDetails.data.data.tag_list);
        setLoading(false);
      } else {
        // Resets state, if user changes from edit to create via navBar.
        setTitle("");
        setBody("");
        setTags("");
        setCalendarDate("");
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

  const completeIncompleteButton = isNewItem() ? ( // Double ternary
    <></>
  ) : isCompleted() ? (
    <button onClick={() => markCompletion(match.params.id, true)}>{"Mark as Incomplete"}</button>
  ) : (
    <button onClick={() => markCompletion(match.params.id, false)}>{"Mark as Complete"}</button>
  );

  // If is a new item, render immediately
  // If is an existing item, must wait to load, then return.
  return !isNewItem() && loading ? (
    <LoadSpinner text={loadingtext} />
  ) : (
    <div className="NewItemBody">
      <form
        className="NewItemform"
        onSubmit={(event) =>
          isNewItem()
            ? onFormSubmit(event, userID, titleState, bodyState, currentTag.toString(), calendarDate, match, history)
            : onFormEdit(
                event,
                userID,
                match.params.id,
                titleState,
                bodyState,
                currentTag.toString(),
                calendarDate,
                match,
                history
              )
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
            placeholder="Item Title, e.g Go    at 6pm"
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
        <Datetime
          dateFormat="YYYY-MM-DD"
          timeFormat={false}
          onChange={(e) => {
            setCalendarDate(e._d);
          }}
          closeOnSelect
          isValidDate={valid}
          inputProps={inputProps}
          // If the calendarDate or isNewItem is empty, then it should be displayed as null
          // apparently calendarDate by itself as "" does not evaluate to "" here.
          value={isNewItem() || calendarDate === "" ? null : new Date(calendarDate)}
        />
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
