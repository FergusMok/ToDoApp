import React from "react"
import { Checkbox, Button, Card, Image } from 'semantic-ui-react'

const ToDoItem = ({item}) => {
    const extra = <div>These will be tags later on </div>
    const dateObj = new Date(item.updated_at)
    return (
    <Card
      header= {item.title}
      meta= {`Last updated: ${dateObj.toDateString()} `}
      description= {item.body}
      extra={extra}
    />)
    }    
export default ToDoItem