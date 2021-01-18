import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTag } from "../redux/filterTag";
import { Dropdown, Container, Grid } from "semantic-ui-react";
import { sortByUpdateDate, sortByDueDate } from "../redux/sortType";
import { filterDueDate, resetFilterDueDate } from "../redux/filterDueDate";
import { RootState } from "../redux/combineReducers";

interface tagOptionsObjectInterface {
  key: string;
  text: string;
  value: string;
}
interface sortOptionObjectInterface {
  key: string;
  text: string;
  value: boolean | string;
}

const FilterBar = ({ match }) => {
  const currentDatabase = useSelector((state: RootState) => state.databaseState);

  const filterOptions = [
    { key: "one", text: "Filter due in a day", value: 1 },
    { key: "three", text: "Filter due in 3 days", value: 3 },
    { key: "seven", text: "Filter due in a week", value: 7 },
  ];
  const [tagOptions, setTagOptions] = useState<tagOptionsObjectInterface[]>([]); // Tags require 2 states
  const currentTag = useSelector((state: RootState) => state.tagState);

  const sortOptions = [
    // isSortByUpdate -> true or false?
    { key: "SORTBYDUEDATE", text: "Sort by due date", value: false },
    { key: "SORTBYUPDATE", text: "Sort by update date", value: true },
  ];
  // This state is solely for animating. I didn't want redux to take in the whole object value returned by Semantic
  const [DropdownSortText, setDropdownSortText] = useState<sortOptionObjectInterface>(sortOptions[0]);

  const dispatch = useDispatch();
  const isCompleted = useCallback(() => match.path === "/completed", [match]);

  useEffect(() => {
    // Parse through the available tags, and display them as options
    const refreshFilterBar = () => {
      // Unique tagsList
      const tagsList = [
        ...new Set<string>(
          currentDatabase
            .filter((jsonObject) => jsonObject.completed === isCompleted() && jsonObject.tag_list.length > 0)
            .map((jsonObject) => jsonObject.tag_list)
            .flat()
        ),
      ];
      setTagOptions(
        tagsList.map((tag) => {
          const newObj: tagOptionsObjectInterface = { key: tag, text: tag, value: tag };
          return newObj;
        })
      );
    };
    refreshFilterBar();
  }, [currentDatabase]);

  // Reset the dropdown animiations and states when changing to a new page.
  useEffect(() => {
    dispatch(addTag([]));
    dispatch(resetFilterDueDate());
    dispatch(sortByDueDate()); // Sort state
    setDropdownSortText(sortOptions[0]); // Sort animation
  }, [match]);

  return (
    <Container>
      <Grid columns={3} stackable>
        <Grid.Column>
          <Dropdown
            fluid
            selection
            options={sortOptions}
            value={DropdownSortText.value} // Im not sure how this works.
            onChange={(event, { value }) => {
              setDropdownSortText({ key: value as string, value: value as boolean, text: value as string });
              value ? dispatch(sortByUpdateDate()) : dispatch(sortByDueDate());
            }}
          />
        </Grid.Column>

        <Grid.Column>
          <Dropdown
            placeholder="Filter by Tags"
            clearable
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
              console.log(value);
              console.log(typeof value);
              value ? dispatch(filterDueDate(value)) : dispatch(resetFilterDueDate());
            }}
          />
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default FilterBar;
