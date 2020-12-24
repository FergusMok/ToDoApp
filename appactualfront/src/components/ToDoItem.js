import React from "react"
import { Checkbox, Button, Card, Image } from 'semantic-ui-react'

const ToDoItem = ({item}) => {
    const extra = <div>These will be tags later on </div>
    return (
    <Card
      header= {item.title}
      meta= {`Last updated: ${item.updated_at.slice(0,10)}`}
      description= {item.body}
      extra={extra}
    />)
    }    
export default ToDoItem