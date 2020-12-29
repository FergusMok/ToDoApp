import React, { useState } from "react";
import { Dimmer, Segment } from "semantic-ui-react";
import { Link } from 'react-router-dom';
import ToDoCard from './ToDoCard'
import axios from 'axios'
import API_LINK from "../api/API_LINK"
import "./ToDoItem.css"
const ToDoItem = ({item, path, getDatabase}) => {

  const [active, setActive] = useState(false);

  const handleShow = () => setActive(true);
  const handleHide = () => setActive(false);
  
  const markComplete = async (id) => { // Put request to mark complete
    await axios.put(`${API_LINK}/${id}`, {
        completed: true,
    }).then(resp => {
        console.log(resp)
    }).catch(resp => console.log(resp))
    getDatabase()
  }

  const markIncomplete = async () => { // Put request to mark complete
  await axios.put(`${API_LINK}/${item.id}`, {
      completed: false,
  }).then(resp => {
      console.log(resp)
  }).catch(resp => console.log(resp))
    getDatabase()
  }

  const isCompleted = () => item.completed
  const isCompletedButton = isCompleted() ? "Incomplete" : "Complete"
  const onClickCompleted = (id) => isCompleted() ? markIncomplete(id) : markComplete(id)

  return   ( 

     <div onMouseEnter = {handleShow} onMouseLeave = {handleHide} >
      <Dimmer.Dimmable blurring dimmed={active}>
        <Dimmer active={active} inverted onClickOutside={handleHide} />
          <ToDoCard item = {item} path = {path}/>
        <Dimmer
          active={active}
          onClickOutside={handleHide}
          verticalAlign="centre" 
          // This will throw a warning. Semantic enum-ed arg as top or botom only. 
        >
          <Link to = {path}>
          <button> Edit </button>
          </Link>
          <button type="button" onClick = {() => onClickCompleted(item.id)}> Mark as {isCompletedButton} </button>
        </Dimmer>
      </Dimmer.Dimmable>
    </div>
  );
 };

export default ToDoItem