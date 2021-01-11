import React from "react";
import ToDoList from "./ToDoList";
import "./CSS/HomePage.css";
import FilterBar from "./FilterBar";
import { Button, Container, Menu } from "semantic-ui-react";

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
