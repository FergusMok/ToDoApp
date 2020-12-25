import React from "react"
import { Checkbox, Button, Card, Image } from 'semantic-ui-react'

const ToDoItem = ({item}) => {
    const extra = <a>These will be tags later on </a>
    const dateObj = new Date(item.updated_at)
    return (
      <Card>
      <Card.Content>
        <Card.Header>{item.title}</Card.Header>
        <Card.Meta>{`Last updated: ${dateObj.toDateString()} `}</Card.Meta>
        <Card.Description style={{whiteSpace: 'pre-wrap', overflowWrap: 'break-word'}}>
          {item.body}
        </Card.Description>

          <Card.Content extra>
              {extra}     
         </Card.Content>
        </Card.Content>
    </Card>)


    }    
export default ToDoItem