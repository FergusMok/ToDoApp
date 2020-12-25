import React from "react"
import { Checkbox, Button, Card, Label } from 'semantic-ui-react'

const ToDoItem = ({item}) => {

    const extra = item.tag_list.map( tag => <Label>{`${tag}`}</Label>)
    const dateObj = new Date(item.updated_at)
    return (
      <Card>
      <Card.Content header = {item.title}/>
      <Card.Content meta = {`Last updated: ${dateObj.toDateString()} `}/>
      <Card.Content description ={item.body} style={{whiteSpace: 'pre-wrap', overflowWrap: 'break-word'}} />
      <Card.Content extra>{extra}</Card.Content>
    </Card>)


    }    
export default ToDoItem