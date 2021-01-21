import ToDoList from "./ToDoList";
import "./CSS/HomePage.css";
import FilterBar from "./FilterBar";

const HomePage = () => {
  return (
    <>
      <br />
      <FilterBar />
      <ToDoList />
    </>
  );
};

export default HomePage;
