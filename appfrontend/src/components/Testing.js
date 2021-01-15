import emailUsers from "../api/API_TESTING";
import React from "react";
import { Button } from "semantic-ui-react";

const Testing = () => {
  return (
    <Button size="huge" onClick={emailUsers}>
      PRESS ME TO EMAIL
    </Button>
  );
};

export default Testing;
