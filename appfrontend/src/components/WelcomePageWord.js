import React from "react";
import ReactVivus from "react-vivus";
import SVG from "./WelcomePageWord.svg";
import "./CSS/WelcomePageWord.css";
const WelcomePageWord = () => {
  return (
    <ReactVivus
      className="fader-slide fader-slide--1"
      id="mySVG"
      option={{
        file: SVG,
        animTimingFunction: "EASE",
        type: "sync",
        duration: 150,
        onReady: console.log,
      }}
      style={{
        margin: "auto",
      }}
      callback={console.log}
    />
  );
};
export default WelcomePageWord;
