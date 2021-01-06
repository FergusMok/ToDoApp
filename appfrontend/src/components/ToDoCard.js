import React from "react";
import { Card, Label } from "semantic-ui-react";
import { addTag, removeTag, tagReducer } from "../redux/tagFilter";
import "./CSS/ToDoCard.css";
import { useSelector } from "react-redux";
const ToDoCard = ({ item }) => {
  const tags = item.tag_list.map((tag) => (
    <Label onClick={() => addTag(tag)} key={tag}>
      {tag}
    </Label>
  ));

  return (
    <>
      <Card>
        <Card.Content
          header={item.title}
          style={{ whiteSpace: "pre-wrap", overflowWrap: "break-word" }}
          className="CardHeader"
        />
        <Card.Content
          meta={`Updated: ${new Date(item.updated_at)
            .toString()
            .substr(4, 17)} `}
          className="CardMeta"
        />
        <Card.Content
          description={item.body}
          style={{ whiteSpace: "pre-wrap", overflowWrap: "break-word" }}
        />
        <Card.Content extra> {tags} </Card.Content>
      </Card>
    </>
  );
};

export default ToDoCard;
