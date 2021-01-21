import React from "react";
import ToDoList from "./ToDoList";
import "./CSS/HomePage.css";
import FilterBar from "./FilterBar";
import { RouteComponentProps } from "react-router-dom";
import { EmptyMatchProps } from "../typings";
import { Route } from "react-router-dom";

const HomePage = ({ match }: EmptyMatchProps) => {
  return (
    <>
      <br />
      <FilterBar match={match} />
      <ToDoList match={match} />
    </>
  );
};

export default HomePage;
