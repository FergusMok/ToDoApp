import React, {useState } from 'react'
import { Dropdown } from "semantic-ui-react";

const options = [];

const TagInputBar = () => {
    const [tagState, setTags] = useState([]);
    const [currentTag, setCurrentTag] = useState([])
    console.log("tagState",tagState)
    console.log("currentTag",currentTag)
    return (
        <Dropdown
        options={tagState}
        placeholder="Choose Language"
        multiple
        search
        selection
        fluid
        allowAdditions
        value={currentTag}
        onAddItem={(event, {value}) => { setTags(prevState => [{text: value, value}, ...prevState])}}
        onChange={(event, {value}) => { setCurrentTag(value)}}
      />
    )
}

export default TagInputBar


/* export default class TagInputBar extends React.Component {
  state = { options };

  handleAddition = (e, { value }) => {
    this.setState((prevState) => ({
      options: [{ text: value, value }, ...prevState.options]
    }));
  };

  handleChange = (e, { value }) => this.setState({ currentValue: value });

  render() {
    const { currentValue } = this.state;
    console.log(this.state)
    return (
      <Dropdown
        options={this.state.options}
        placeholder="Choose Language"
        multiple
        search
        selection
        fluid
        allowAdditions
        value={currentValue}
        onAddItem={this.handleAddition}
        onChange={this.handleChange}
      />
    );
  }
} */