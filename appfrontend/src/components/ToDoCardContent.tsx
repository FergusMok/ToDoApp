import React from "react";
import { Card, Label } from "semantic-ui-react";
import { addTag } from "../redux/filterTag";
import { useSelector } from "react-redux";
import { RootState } from "../redux/combineReducers";
import { ToDoItemProps } from "../typings";

const ToDoCard = ({ item }: ToDoItemProps) => {
  const tags = item.tag_list.map((tag: string) => (
    <Label onClick={() => addTag(tag)} key={tag}>
      {tag}
    </Label>
  ));

  const isSortingByUpdateDate = useSelector((state: RootState) => state.sortState);

  // Default isSortingByUpdateDate is false
  const showDate = isSortingByUpdateDate
    ? `Updated: ${new Date(item.updated_at).toString().substr(4, 17)} `
    : item.due_date
    ? `Due: ${item.due_date.substr(4, 12)}`
    : "Due: -";

  return (
    <>
      <Card>
        <Card.Content
          header={item.title}
          style={{ whiteSpace: "pre-wrap", overflowWrap: "break-word" }}
          className="CardHeader"
        />
        <Card.Content meta={showDate} className="CardMeta" />
        <Card.Content description={item.body} style={{ whiteSpace: "pre-wrap", overflowWrap: "break-word" }} />
        <Card.Content extra> {tags} </Card.Content>
      </Card>
    </>
  );
};

export default ToDoCard;
