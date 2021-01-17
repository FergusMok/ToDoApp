import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";

interface SpinnerProps {
  text: string;
}

const LoadSpinner = ({ text }: SpinnerProps) => {
  return (
    <Dimmer active style={{ height: "100vh" }}>
      <Loader content={text} />
    </Dimmer>
  );
};

export default LoadSpinner;
