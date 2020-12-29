import React from "react"
import { Checkbox, Button, Card, Label } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import './ToDoCard.css'
const ToDoCard = ({item, path}) => {

    const tags = item.tag_list.map( tag => <Label key={tag}>{tag}</Label>)
    const dateObj = new Date(item.updated_at)
    return (
      <>
      <Card>
        <Card.Content header = {item.title} style={{whiteSpace: 'pre-wrap', overflowWrap: 'break-word'}} className = "CardHeader"/>
        <Card.Content meta = {`Updated: ${dateObj.toString().substr(4,17) } `} className = "CardMeta"/>
        <Card.Content description ={item.body} style={{whiteSpace: 'pre-wrap', overflowWrap: 'break-word'}} />
        <Card.Content extra> {tags} </Card.Content>
    </Card>
{/*         <Card.Content>
            <Card.Header>{item.title}</Card.Header>
            <Card.Meta>{`Updated: ${dateObj.toString().substr(4,17) } `}</Card.Meta>
            <Card.Description>{item.body}</Card.Description>
            {tags}
        </Card.Content>
        </Card>
 */}    </>)
    }


    

export default ToDoCard