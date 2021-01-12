import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";

const LoadSpinner = ({ text }) => {
  return (
    <Dimmer active style={{ height: "100vh" }}>
      <Loader content={text} />
    </Dimmer>
  );
};

export default LoadSpinner;
