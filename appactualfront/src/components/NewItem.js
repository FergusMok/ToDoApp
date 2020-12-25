import React, {useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom';
import { Button, Dropdown } from 'semantic-ui-react'
import axios from 'axios'
import API_LINK from "../api/API_LINK"


const NewItem = ({match}) => {

    // Title and body can be converted 1 state, but flattened so as to prevent double re-rendering.     
    const [titleState, setTitle] = useState("")  
    const [bodyState, setBody] = useState("")
    
    // The tagInputBar requires 2 states to work. 
    const [tagState, setTags] = useState([]);
    const [currentTag, setCurrentTag] = useState([])
    const history = useHistory();


    console.log("Hello from match in newItem", match)

    const redirect = () => { // Redirect once CRUD operaton is done. 
        if (match.path === "/completed/:id") { // Complete will route back to complete
            history.push("/completed")
        } else { // Create and Incomplete should route back to incomplete 
            history.push("/incomplete")
        }
    }

    // Completed defaulted to be false 
    const onFormSubmit = async (event) => {
        event.preventDefault();
        await axios.post(API_LINK, {
            title: titleState,
            body: bodyState,
            tag_list: currentTag.toString()
        }).then(resp => {
            console.log(resp)
        })
        redirect()
    }

    const onFormEdit = async (event) => { // Put request, should not change completed.
        event.preventDefault();
        await axios.put(`${API_LINK}/${match.params.id}`, {
            title: titleState,
            body: bodyState,
            tag_list: currentTag.toString()
        }).then(resp => {
            console.log(resp)
        }).catch(resp => console.log(resp))
        redirect()
    }

    const isNewItem = () => (match.path === "/create")

    useEffect( () => { // Fills up the form for put request.
        console.log("render")
        const refreshArticle = async () => {
            if (!isNewItem()) {
                const itemDetails = await axios.get(`${API_LINK}/${match.params.id}`)
                setTitle(itemDetails.data.data.title)
                setBody(itemDetails.data.data.body)
                // Parse the tags, and set them to the tagState
                setTags( itemDetails.data.data.tag_list.map( tag => { 
                    const newObj = {key: tag, text: tag, value: tag} 
                    return newObj
                }))
                setCurrentTag( itemDetails.data.data.tag_list )
            } else { // Resets state, if user changes from edit to create via navBar.
                setTitle("")
                setBody("")
                setTags("")
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
    const submitEditButton = <Button type="submit" content={ isNewItem()? 'Submit': "Edit"} />
    const deleteButton = isNewItem()? <></> : <Button onClick = {() => deleteEntry()} content={"Delete"}/>
    const markAsComplete = isNewItem()? <></> : <Button onClick = {() => markComplete()} content={"Complete"}/>

    return <form onSubmit = { (event) => isNewItem()? onFormSubmit(event) : onFormEdit(event) }>
            <div className="ui form" >
                <div className="Title">
                    <label>Title</label>
                    <input type="text" value = {titleState} onInput = {(e) => setTitle(e.target.value)} name="first-name" placeholder="Title"/>
                </div>
                <div className="field">
                    <label>Body</label>
                    <textarea value = {bodyState} onInput = {(e) => setBody(e.target.value)} placeholder = "Body"></textarea>
                </div>
                <Dropdown
                    options={tagState}
                    placeholder="Tags!"
                    multiple
                    search
                    selection
                    fluid
                    allowAdditions
                    value={currentTag}
                    onAddItem={(event, {value}) => { setTags(prevState => [{text: value, value}, ...prevState])}}
                    onChange={(event, {value}) => { setCurrentTag(value)}}
                />
                <Button.Group>
                    {submitEditButton}
                    {deleteButton}
                    {markAsComplete}
                </Button.Group>
            </div>
        </form>
}

export default NewItem