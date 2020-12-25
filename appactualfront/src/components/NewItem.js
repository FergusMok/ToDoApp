import React, {useState, useEffect} from 'react'
import { Link, useHistory } from 'react-router-dom';
import { Button } from 'semantic-ui-react'
import axios from 'axios'

const API_LINK = 'http://localhost:5000/api/v1/items'


const NewItem = ({match}) => {
    const [titleState, setTitle] = useState("")
    const [bodyState, setBody] = useState("")
    const [tagState, setTags] = useState("")
    const [newItemState, setNewItem] = useState(true) // Used to determine if new page or not.
    const history = useHistory();


    console.log("Hello from match in newItem", match)

    const redirect = () => { // Redirect once CRUD operaton is done. 
        if (match.path == "/completed/:id") { // Complete will route back to complete
            history.push("/completed")
        } else { // Create and Incomplete should route back to incomplete 
            history.push("/incomplete")
        }
    }

    // Completed defaulted to be false 
    const onFormSubmit = async (event) => {
        event.preventDefault();
        console.log("Hello from submit in newItem")
        await axios.post(API_LINK, {
            title: titleState,
            body: bodyState
        }).then(resp => {
            console.log(resp)
        })
        redirect()
    }

    const onFormEdit = async (event) => { // Put request, should not change completed.
        console.log("Hello, from edit in newItem")
        event.preventDefault();
        await axios.put(`${API_LINK}/${match.params.id}`, {
            title: titleState,
            body: bodyState
        }).then(resp => {
            console.log(resp)
        }).catch(resp => console.log(resp))
        redirect()
    }

    useEffect( () => { // Fills up the form for put request.
        console.log("render")
        const refreshArticle = async () => {
            if (match.path !== "/create") {
                const itemDetails = await axios.get(`${API_LINK}/${match.params.id}`)
                setNewItem(false)
                setTitle(itemDetails.data.data.title)
                setBody(itemDetails.data.data.body)
            } else { // For creation of new form. 
                setNewItem(true)
                setTitle("")
                setBody("")
            }
        }
        refreshArticle()}, [match.path])

    const deleteEntry = async () => { // Destroy
            await axios.delete(`${API_LINK}/${match.params.id}`)
            redirect()
        }
    
    const markComplete = async () => { // Put request to mark complete
            await axios.put(`${API_LINK}/${match.params.id}`, {
                completed: true,
            }).then(resp => {
                console.log(resp)
            }).catch(resp => console.log(resp))
            redirect()
    }

    // Conditional rendering of the buttons
    const submitEditButton = <Button type="submit" content={ newItemState? 'Submit': "Edit"} />
    const deleteButton = newItemState? <></> : <Button onClick = {() => deleteEntry()} content={"Delete"}/>
    const markAsComplete = newItemState? <></> : <Button onClick = {() => markComplete()} content={"Complete"}/>

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
                <Button.Group>
                    {submitEditButton}
                    {deleteButton}
                    {markAsComplete}
                </Button.Group>
            </div>
        </form>
}

export default NewItem