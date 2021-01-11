import React from "react";
import { useHistory } from "react-router-dom";
import "../CSS/NewItem.css";

const NotFoundPage = () => {
  const history = useHistory();
  return (
    <div className="NewItemBody">
      <div className="formNotFoundPage">
        <h1> Page not found! </h1>
        <p> Hello, the page that you are finding is not found! Press here to return back to the welcome page.</p>
        <button onClick={() => history.push("/")}> Welcome Page </button>
      </div>{" "}
    </div>
  );
};

export default NotFoundPage;
