import React from "react";
import ToDoList from "./ToDoList";
import "./CSS/HomePage.css";
import FilterBar from "./FilterBar";

const HomePage = ({ match }) => {
  return (
    <>
      <br />
      <FilterBar match={match} />
      <ToDoList match={match} />
    </>
  );
};

export default HomePage;
