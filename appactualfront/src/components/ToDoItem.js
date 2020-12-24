import React from "react"
import { Checkbox, Button, Card, Image } from 'semantic-ui-react'

const ToDoItem = ({item}) => {
/*     return (<Card.Group>
                <Card>
                <Card.Content>
                    <Card.Header>{item.title}</Card.Header>
                    <Card.Meta>Inserts tags here later</Card.Meta>
                    <Card.Meta>Inserts date here</Card.Meta>
                    <Card.Description>
                    {item.body}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <div className='ui two buttons'>
                    <Button basic color='green' >
                        Mark as Complete
                    </Button>
                    <Button basic color='red'>
                        Delete
                    </Button>
                    </div>
                </Card.Content>
                </Card>
            </Card.Group>)
    }
 */
    console.log(item)
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