import React from "react";
import { Dimmer, Loader, Image, Segment } from "semantic-ui-react";

const LoadSpinner = ({ text }) => {
  return (
    <Segment style={{ height: "100vh" }}>
      <Dimmer active>
        <Loader content={text} />
      </Dimmer>
    </Segment>
  );
};

export default LoadSpinner;
