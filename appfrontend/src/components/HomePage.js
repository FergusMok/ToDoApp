import React from "react";
import ToDoList from "./ToDoList";
import "./CSS/HomePage.css";
import FilterBar from "./FilterBar";

const HomePage = ({ match }) => {
  return (
    <div>
      <FilterBar match={match} />
      <ToDoList match={match} />
    </div>
  );
};

export default HomePage;
