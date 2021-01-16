import React from "react";
import ReactVivus from "react-vivus";
import SVG from "./WelcomePageWord.svg";
import "./CSS/WelcomePageWord.css";
const WelcomePageWord = () => {
  return (
    <ReactVivus
      id="mySVG"
      option={{
        file: SVG,
        animTimingFunction: "EASE",
        type: "sync",
        duration: 150,
        onReady: console.log,
      }}
      callback={console.log}
    />
  );
};
export default WelcomePageWord;
