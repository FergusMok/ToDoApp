import React from "react";
import ToDoList from "./ToDoList";
import "./CSS/HomePage.css";
import FilterBar from "./FilterBar";
import { RouteComponentProps } from "react-router-dom";

const HomePage = ({ match }: RouteComponentProps) => {
  return (
    <>
      <br />
      <FilterBar match={match} />
      <ToDoList match={match} />
    </>
  );
};

export default HomePage;
