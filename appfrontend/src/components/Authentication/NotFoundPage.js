import React from "react";
import { useHistory } from "react-router-dom";
import { Container, Segment } from "semantic-ui-react";
import "../CSS/NewItem.css";

const NotFoundPage = () => {
  const history = useHistory();
  return (
    <div className="NewItemBodyNonAuthenticated">
      <div style={{ width: "70vh" }}>
        <Segment>
          <h1> Page not found! </h1>
          <p> Hello, the page that you are finding is not found!</p>
          <p> How did you even get here? </p>
          <p> Press here to return back to the welcome page.</p>
          <button onClick={() => history.push("/")}> Welcome Page </button>
        </Segment>
      </div>
    </div>
  );
};

export default NotFoundPage;
