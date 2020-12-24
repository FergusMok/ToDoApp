import React, {useState, useEffect} from 'react'
import { Button } from 'semantic-ui-react'
import axios from 'axios'

const API_LINK = 'http://localhost:5000/api/v1/items'


const NewItem = ({match}) => {
    const [titleState, setTitle] = useState("")
    const [bodyState, setBody] = useState("")
    const [newItemState, setNewItem] = useState(true)

    const onFormSubmit = async (event) => {
        event.preventDefault();
        console.log("Hello from submit")
        await axios.post(API_LINK, {
            title: titleState,
            body: bodyState
        }).then(resp => {
            console.log(resp)
        })
    }

    const onFormEdit = async (event) => { // Put request.
        event.preventDefault();
        await axios.put(`${API_LINK}/${match.params.id}`, {
            title: titleState,
            body: bodyState
        }).then(resp => {
            console.log(resp)
        }).catch(resp => console.log(resp))
    }

    useEffect( () => { // Fills up the form for put request.
        const refreshArticle = async () => {
            if (match.path !== "/create") {
                const itemDetails = await axios.get(`${API_LINK}/${match.params.id}`)
                setNewItem(false)
                setTitle(itemDetails.data.data.title)
                setBody(itemDetails.data.data.body)
            }
        }
        refreshArticle()}, [match])

    const deleteEntry = async () => { // Delete button
            await axios.delete(`${API_LINK}/${match.params.id}`)
        }
    
    console.log(match)

    const deleteButton = newItemState? <div> </div> : <Button onClick = {() => deleteEntry()} content={"Delete"} secondary />
    // Conditional rendering of the delete button

    return <form onSubmit = {newItemState? onFormSubmit : onFormEdit}>
            <div className="ui form" >
                <div className="Title">
                    <label>Title</label>
                    <input type="text" value = {titleState} onInput = {(e) => setTitle(e.target.value)} name="first-name" placeholder="Title"/>
                </div>
                <div className="field">
                    <label>Body</label>
                    <textarea value = {bodyState} onInput = {(e) => setBody(e.target.value)} placeholder = "Body"></textarea>
                </div>
                    <Button type="submit" content={ newItemState? 'Submit': "Edit"} primary />
                </div>
                <div>
                    {deleteButton}
                </div>
        </form>
}

export default NewItem