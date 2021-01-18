import React, { useState, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { XMasonry, XBlock } from "react-xmasonry";
import ToDoItem from "./ToDoCard";
import { getDatabase } from "../api/API_CRUD";
import "./CSS/ToDoList.css";
import LoadSpinner from "./LoadSpinner";
import { change_db } from "../redux/database";
import { RootState, store } from "../redux/combineReducers";

const ToDoList = ({ match }) => {
  const activated = useSelector((state: RootState) => state.navigationState);
  const currentDatabase = useSelector((state: RootState) => state.databaseState);
  const currentTag = useSelector((state: RootState) => state.tagState);
  const isSortingByUpdateDate = useSelector((state: RootState) => state.sortState);
  const filterDueDateDaysBy = useSelector((state: RootState) => state.dueDateState);
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
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  const filterBasedOnDueDate = (jsonObject) => {
    if (!filterDueDateDaysBy) {
      return true;
    } else {
      if (jsonObject.due_date) {
        const todayOffsetByFilter: Date = new Date();
        todayOffsetByFilter.setDate(todayOffsetByFilter.getDate() + filterDueDateDaysBy); // Add days to date
        const dateObj: Date = new Date(jsonObject.due_date);
        return (todayOffsetByFilter.getTime() - dateObj.getTime()) / _MS_PER_DAY >= 0;
      }
      return false;
    }
  };

  // Comparators
  const sortBasedOnUpdate = (a, b) => {
    return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
  };
  const sortBasedOnDueDate = (a, b) => {
    if (a.due_date === b.due_date) {
      return 0;
    } else if (a.due_date === null) {
      return 1;
    } else if (b.due_date === null) {
      return -1;
    } else {
      return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
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
      //
      //<XMasonry style={{ marginTop: "5vh" }} maxColumns={4}>
      <XMasonry maxColumns={4}>{renderDatabase}</XMasonry>
    );
  }, [currentTag, renderDatabase]);

  return loading ? <LoadSpinner text="Loading data.." /> : displayDatabase();
};

export default ToDoList;
