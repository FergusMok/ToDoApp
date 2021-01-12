import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTag } from "../redux/filterTag";
import { Dropdown, Container, Grid } from "semantic-ui-react";
import { sortByUpdateDate, sortByDueDate } from "../redux/sortType";
import { filterDueDate, resetFilterDueDate } from "../redux/filterDueDate";

const FilterBar = ({ match }) => {
  const currentDatabase = useSelector((state) => state.databaseState);

  const [tagOptions, setTagOptions] = useState([]); // Tags require 2 states
  const currentTag = useSelector((state) => state.tagState);

  const filterDueDateState = useSelector((state) => state.dueDateState); // Default is an empty string.
  const filterOptions = [
    { key: "one", text: "Filter due in a day", value: 1 },
    { key: "three", text: "Filter due in 3 days", value: 3 },
    { key: "seven", text: "Filter due in a week", value: 7 },
  ];

  const sortOptions = [
    { key: "SORTBYDUEDATE", text: "Sort by due date", value: false },
    { key: "SORTBYUPDATE", text: "Sort by update date", value: true },
  ];

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

  return (
    <Container>
      <Grid columns={3} stackable>
        <Grid.Column>
          <Dropdown
            placeholder="Sort based on"
            fluid
            selection
            options={sortOptions}
            //defaultValue="Sort by due date" This thing is not working
            onChange={(event, { value }) => (value ? dispatch(sortByUpdateDate()) : dispatch(sortByDueDate()))}
          />
        </Grid.Column>

        <Grid.Column>
          <Dropdown
            placeholder="Filter by Tags"
            fluid
            multiple
            selection
            options={tagOptions}
            value={currentTag}
            onChange={(event, { value }) => {
              dispatch(addTag(value));
            }}
          />
        </Grid.Column>
        <Grid.Column>
          <Dropdown
            placeholder="Filter by due date"
            fluid
            selection
            clearable
            options={filterOptions}
            onChange={(event, { value }) => {
              value ? dispatch(filterDueDate(value)) : dispatch(resetFilterDueDate());
            }}
          />
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default FilterBar;
