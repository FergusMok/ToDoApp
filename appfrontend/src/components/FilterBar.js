import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown } from "semantic-ui-react";
import { addTag } from "../redux/tagFilter";

const FilterBar = ({ match }) => {
  const currentDatabase = useSelector((state) => state.databaseState);
  const [tagOptions, setTagOptions] = useState([]);
  const currentTag = useSelector((state) => state.tagState);
  const dispatch = useDispatch();

  const isCompleted = useCallback(() => match.path === "/completed", [match]);

  useEffect(() => {
    // Parse through the available tags, and display them as options
    const refreshFilterBar = () => {
      // Unique tagsList
      const tagsList = [
        ...new Set(
          currentDatabase
            .filter((jsonObject) => jsonObject.completed === isCompleted() && jsonObject.tag_list.length > 0)
            .map((jsonObject) => jsonObject.tag_list)
        ),
      ];
      setTagOptions(
        tagsList.flat().map((tag) => {
          const newObj = { key: tag, text: tag, value: tag };
          return newObj;
        })
      );
    };
    refreshFilterBar();
  }, [currentDatabase]);

  useEffect(() => {
    dispatch(addTag([])); // Reset the dropdown animation when change to a new page
  }, [match]);

  console.log(currentTag);
  return (
    <Dropdown
      placeholder="Skills"
      fluid
      multiple
      selection
      options={tagOptions}
      value={currentTag}
      onChange={(event, { value }) => {
        dispatch(addTag(value));
      }}
    />
  );
};

export default FilterBar;
