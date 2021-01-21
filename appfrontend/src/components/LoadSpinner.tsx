import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";
import { SpinnerProps } from "../typings";

const LoadSpinner = ({ text }: SpinnerProps) => {
  return (
    <Dimmer active style={{ height: "100vh" }}>
      <Loader content={text} />
    </Dimmer>
  );
};

export default LoadSpinner;
