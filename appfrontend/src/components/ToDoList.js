import React, { useState, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { XMasonry, XBlock } from "react-xmasonry";
import ToDoItem from "./ToDoCard";
import { getDatabase } from "../api/API_CRUD";
import "./CSS/ToDoList.css";
import LoadSpinner from "./LoadSpinner";
import { change_db } from "../redux/database";
import { store } from "../redux/combineReducers";

const ToDoList = ({ match }) => {
  const activated = useSelector((state) => state.navigationState);
  const currentDatabase = useSelector((state) => state.databaseState);
  const currentTag = useSelector((state) => state.tagState);
  const isSortingByUpdateDate = useSelector((state) => state.sortState);
  const filterDueDateDaysBy = useSelector((state) => state.dueDateState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    store.dispatch(change_db([]));
    setLoading(true);
    const databaseFn = async () => {
      await getDatabase(match.path !== "/incomplete");
      setLoading(false);
    };
    databaseFn();
  }, [activated]);

  const filterBasedOnTag = (jsonObject) => {
    // If currentTag is not empty, then we will filter based on currentTag
    if (currentTag.length > 0) {
      if (jsonObject.tag_list.filter((e) => currentTag.indexOf(e) !== -1).length > 0) {
        return true;
      } else {
        return false;
      }
    } else {
      // If currentTag is empty, then no filter is applied
      return true;
    }
  };
  const filterBasedOnDueDate = (jsonObject) => {
    if (!filterDueDateDaysBy) {
      return true;
    } else {
      if (jsonObject.due_date) {
        const today = new Date();
        return today.setDate(today.getDate() + filterDueDateDaysBy) - new Date(jsonObject.due_date) >= 0;
      }
      return false;
    }
  };

  // Comparators
  const sortBasedOnUpdate = (a, b) => {
    return new Date(b.updated_at) - new Date(a.updated_at);
  };
  const sortBasedOnDueDate = (a, b) => {
    if (a.due_date === b.due_date) {
      return 0;
    } else if (a.due_date === null) {
      return 1;
    } else if (b.due_date === null) {
      return -1;
    } else {
      return new Date(a.due_date) - new Date(b.due_date);
    }
  };
  // This has very high complexity, may bottleneck here.
  const renderDatabase = currentDatabase
    .filter((x) => filterBasedOnTag(x))
    .filter((x) => filterBasedOnDueDate(x))
    .sort((a, b) => (isSortingByUpdateDate ? sortBasedOnUpdate(a, b) : sortBasedOnDueDate(a, b)))
    .map((jsonObject) => {
      return (
        <XBlock key={jsonObject.id}>
          <div className="XMasonryCard">
            <ToDoItem item={jsonObject} />
          </div>
        </XBlock>
      );
    });

  // If renderDatabase is loading, we'll need buffer some things first right
  const displayDatabase = useCallback(() => {
    return (
      <XMasonry style={{ marginTop: "5vh" }} maxColumns={4}>
        {renderDatabase}
      </XMasonry>
    );
  }, [currentTag, renderDatabase]);

  return loading ? <LoadSpinner text="Loading data.." /> : displayDatabase();
};

export default ToDoList;
