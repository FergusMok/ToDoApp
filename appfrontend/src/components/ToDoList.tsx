import React, { useState, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { XMasonry, XBlock } from "react-xmasonry";
import ToDoCard from "./ToDoCard";
import { getDatabase } from "../api/API_CRUD";
import "./CSS/ToDoList.css";
import LoadSpinner from "./LoadSpinner";
import { change_db } from "../redux/database";
import { RootState, store } from "../redux/combineReducers";
import { completeItem } from "../typings";
import { useLocation } from "react-router-dom";

const ToDoList = () => {
  const activated = useSelector((state: RootState) => state.navigationState);
  const currentDatabase = useSelector((state: RootState) => state.databaseState);
  const currentTag = useSelector((state: RootState) => state.tagState);
  const isSortingByUpdateDate = useSelector((state: RootState) => state.sortState);
  const filterDueDateDaysBy = useSelector((state: RootState) => state.dueDateState);
  const searchText: string = useSelector((state: RootState) => state.searchTextState);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    store.dispatch(change_db([]));
    setLoading(true);
    const databaseFn = async () => {
      await getDatabase(location.pathname !== "/incomplete");
      setLoading(false);
    };
    databaseFn();
  }, [activated, location]);

  const filterBasedOnSearchText = (jsonObject: completeItem) => {
    if (searchText) {
      const filterArray = searchText.split(" ");
      const message = jsonObject.body.split(" ").concat(jsonObject.title.split(" "));
      return filterArray.every((string) => message.includes(string));
    }
    return true;
  };

  const filterBasedOnTag = (jsonObject: completeItem) => {
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
  const filterBasedOnDueDate = (jsonObject: completeItem) => {
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
  const sortBasedOnUpdate = (a: completeItem, b: completeItem) => {
    return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
  };
  const sortBasedOnDueDate = (a: completeItem, b: completeItem) => {
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
    .filter((x: completeItem) => filterBasedOnSearchText(x))
    .filter((x: completeItem) => filterBasedOnTag(x))
    .filter((x: completeItem) => filterBasedOnDueDate(x))
    .sort((a: completeItem, b: completeItem) =>
      isSortingByUpdateDate ? sortBasedOnUpdate(a, b) : sortBasedOnDueDate(a, b)
    )
    .map((jsonObject: completeItem) => {
      return (
        <XBlock key={jsonObject.id}>
          <div className="XMasonryCard">
            <ToDoCard item={jsonObject} />
          </div>
        </XBlock>
      );
    });

  const displayDatabase = useCallback(() => {
    return <XMasonry maxColumns={4}>{renderDatabase}</XMasonry>;
  }, [renderDatabase]);

  return loading ? <LoadSpinner text="Loading data.." /> : displayDatabase();
};

export default ToDoList;
