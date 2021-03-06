import React, { useState, useEffect, useCallback } from "react";
import { Dropdown } from "semantic-ui-react";
import axios from "axios";
import { API_LINK_ITEMS_POSTFIX } from "../api/API_LINK";
import "./CSS/NewItem.css";
import { markCompletion, deleteEntry, onFormEdit, onFormSubmit } from "../api/API_CRUD";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import "react-datetime/css/react-datetime.css";
import Datetime from "react-datetime";
import moment, { Moment } from "moment";
import LoadSpinner from "./LoadSpinner";
import { RootState } from "../redux/combineReducers";
import { tagOptionsObjectInterface, itemForSubmission } from "../typings";
import { Location } from "history"; // Important, because Location is found on 2 .d.ts. The typescript and history files.

// Match's params contain either {}(/create) or an id(/completed/:id or /incomplete/:id).
const NewItem = () => {
  // I've decided to not use match because it introduced alot of unsolvable problems
  // within Typescript, and instead I'll parse the location for the id. Far easier.
  const location: Location<undefined> = useLocation();
  const itemID = useCallback(() => location.pathname.split("/")[2], [location]);

  // Title and body can be converted 1 state, but flattened so as to prevent double re-rendering.
  const [titleState, setTitle] = useState<string>("");
  const [bodyState, setBody] = useState<string>("");
  const userID = useSelector((state: RootState) => state.IDState);

  // The tagInputBar requires 2 states to work.
  const [tagState, setTags] = useState<tagOptionsObjectInterface[]>([]);
  const [currentTag, setCurrentTag] = useState<string[]>([]);

  // Spinner state
  const loadingtext = "Fetching your information..";
  const [loading, setLoading] = useState<boolean>(true);

  // Determines the rendering of the page
  const history = useHistory();
  const isNewItem = useCallback(() => location.pathname === "/create", [location]);
  const isCompleted = useCallback(() => location.pathname === "/completed/:id", [location]);

  // Calendar-related var
  var inputProps = { placeholder: "Due date" };
  const [calendarDate, setCalendarDate] = useState<string>(""); // "" when empty, Date type otherwise
  var yesterday = moment().subtract(1, "day"); // This function and below is all given by react-datetime.
  var valid = (current: Moment) => {
    return current.isAfter(yesterday);
  };

  useEffect(() => {
    // Fills up the form for put request.
    const refreshArticle = async () => {
      if (!isNewItem()) {
        const itemDetails = await axios.get(`${API_LINK_ITEMS_POSTFIX}/${itemID()}`);
        setTitle(itemDetails.data.data.title);
        setBody(itemDetails.data.data.body);
        // Parse the tags, and set them to the tagState
        setTags(
          itemDetails.data.data.tag_list.map((tag: string) => {
            const newObj: tagOptionsObjectInterface = { key: tag, text: tag, value: tag };
            return newObj;
          })
        );
        if (itemDetails.data.data.due_date) {
          // If there is a due date specified
          console.log(itemDetails.data.data.due_date);
          // setCalendarDate(new Date(itemDetails.data.data.due_date));

          setCalendarDate(itemDetails.data.data.due_date);
        } else {
          // No due date specified, just leave the date to default "", which would become null below via ternary.
        }
        setCurrentTag(itemDetails.data.data.tag_list);
        setLoading(false);
      } else {
        // Resets state, if user changes from edit to create via navBar.
        setTitle("");
        setBody("");
        setTags([]);
        setCalendarDate("");
        //setCalendarDate("");
      }
    };
    refreshArticle();
  }, [location.pathname, isNewItem, itemID]);

  // Conditional rendering of the buttons
  const submitEditButton = <button type="submit">{isNewItem() ? "Submit" : "Edit"}</button>;

  const deleteButton = isNewItem() ? <></> : <button onClick={() => deleteEntry(itemID())}> {"Delete"} </button>;

  const completeIncompleteButton = isNewItem() ? ( // Double ternary
    <></>
  ) : isCompleted() ? (
    <button onClick={() => markCompletion(itemID(), false)}>{"Mark as Complete"}</button>
  ) : (
    <button onClick={() => markCompletion(itemID(), true)}>{"Mark as Incomplete"}</button>
  );

  // If is a new item, render immediately
  // If is an existing item, must wait to load, then return.
  return !isNewItem() && loading ? (
    <LoadSpinner text={loadingtext} />
  ) : (
    <div className="NewItemBody">
      <form
        className="NewItemform"
        onSubmit={(event) => {
          const item: itemForSubmission = {
            user_id: userID,
            title: titleState,
            body: bodyState,
            tag_list: currentTag.toString(),
            due_date: calendarDate,
          };
          isNewItem() ? onFormSubmit(event, item, history) : onFormEdit(event, itemID(), item, location, history);
        }}
      >
        <h1> {isNewItem() ? "Create new item!" : "Edit item!"} </h1>
        <label>
          Title:
          <input
            value={titleState}
            onInput={(e) => setTitle((e.target as HTMLInputElement).value)}
            required
            minLength={3}
            maxLength={27}
            placeholder="Item Title, e.g Go fishing at 6pm"
          />
        </label>
        <label>
          Body:
          <textarea
            value={bodyState}
            onInput={(e) => setBody((e.target as HTMLInputElement).value)}
            required
            minLength={5}
            maxLength={300}
            placeholder="Item Body, e.g Remember to book tickets to Hawaii"
          />
        </label>
        <Datetime
          dateFormat="YYYY-MM-DD"
          timeFormat={false}
          onChange={(event: any) => {
            // Force cast
            setCalendarDate(event._d);
          }}
          closeOnSelect
          isValidDate={valid}
          inputProps={inputProps}
          // If the calendarDate or isNewItem is empty, then it should be displayed as null
          // apparently calendarDate by itself as "" does not evaluate to "" here.
          value={isNewItem() || calendarDate === "" ? undefined : new Date(calendarDate)} // Is undefined because Datetime.d.ts said so.
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
            setTags((prevState): tagOptionsObjectInterface[] => [
              { text: value as string, value: value as string, key: value as string }, // Force cast
              ...prevState,
            ]);
          }}
          onChange={(event, { value }) => {
            setCurrentTag(value as string[]); // Force cast
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
