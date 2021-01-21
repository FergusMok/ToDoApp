import React, { useState } from "react";
import { Dimmer } from "semantic-ui-react";
import { Link } from "react-router-dom";
import ToDoCard from "./ToDoCardContent";
import "./CSS/ToDoItem.css";
import { markCompletion } from "../api/API_CRUD";
import { ToDoItemProps } from "../typings";

const ToDoItem = ({ item }: ToDoItemProps) => {
  const [active, setActive] = useState(false);
  const handleShow = () => setActive(true);
  const handleHide = () => setActive(false);
  const isCompleted = () => item.completed;
  const isCompletedButtonText = isCompleted() ? "Incomplete" : "Complete";

  return (
    <div onMouseEnter={handleShow} onMouseLeave={handleHide}>
      <Dimmer.Dimmable blurring dimmed={active}>
        <Dimmer active={active} inverted onClickOutside={handleHide} />
        <ToDoCard item={item} />
        <Dimmer
          active={active}
          onClickOutside={handleHide}
          verticalAlign="centre"
          // This will throw a warning. Semantic enum-ed arg as top or botom only.
        >
          <Link to={isCompleted() ? `/completed/${item.id}` : `/incomplete/${item.id}`}>
            <button> Edit </button>
          </Link>
          <button type="button" onClick={() => markCompletion(item.id, isCompleted())}>
            Mark as {isCompletedButtonText}
          </button>
        </Dimmer>
      </Dimmer.Dimmable>
    </div>
  );
};

export default ToDoItem;
