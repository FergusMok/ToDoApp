import React, {useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom';
import { Button, Dropdown } from 'semantic-ui-react'
import axios from 'axios'
import API_LINK from "../api/API_LINK"
import "./NewItem.css"
import { useDispatch, useSelector } from 'react-redux'
import { navigate }  from "../redux/NavigationBar"
import ValidationModal from './ValidationModal'

const NewItem = ({match}) => {

    // Title and body can be converted 1 state, but flattened so as to prevent double re-rendering.     
    const [titleState, setTitle] = useState("")  
    const [bodyState, setBody] = useState("")

    // The tagInputBar requires 2 states to work. 
    const [tagState, setTags] = useState([]);
    const [currentTag, setCurrentTag] = useState([])
    const history = useHistory();
    const dispatch = useDispatch();


    console.log("Hello from match in newItem", match)

    const redirect = () => { // Redirect once CRUD operaton is done. 
        if (match.path === "/completed/:id") { // Complete will route back to complete
            history.push("/completed")
        } else { // Create and Incomplete should route back to incomplete 
            if (isNewItem()) {
                dispatch(navigate("Incomplete"))
            }

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
        }).catch(resp => console.log(resp))
        redirect()
    }

    const onFormEdit = async (event) => { // Put request, should not change completed.
        console.log("Edit called")
        event.preventDefault();
        await axios.put(`${API_LINK}/${match.params.id}`, {
            title: titleState,
            body: bodyState,
            tag_list: currentTag.toString()
        }).catch(error => {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx. This is for troubleshooting only.
                // The input bar should handle the validation. 
                console.log("Data",error.response.data);
            } else {
                console.log("Error",error)
            }
        })
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

    const markIncomplete = async () => { // Put request to mark complete
        await axios.put(`${API_LINK}/${match.params.id}`, {
            completed: false,
        }).then(resp => {
            console.log(resp)
        }).catch(resp => console.log(resp))
        redirect()
    }


    // Conditional rendering of the buttons
    const submitEditButton = <button type="submit">{isNewItem() ? 'Submit': "Edit"}</button>
    const deleteButton = isNewItem() ? <></> : <button onClick = {() => deleteEntry()}> {"Delete"} </button>
    // Double ternary
    const completeIncompleteButton = isNewItem()? <></> : 
        (match.path === "/completed/:id") ?
        <button onClick = {() => markIncomplete()}>{"Mark as Incomplete"}</button> :
        <button onClick = {() => markComplete()}>{"Mark as Complete"}</button>


    return (<div className = "NewItemBody">
                <form onSubmit = { (event) => isNewItem()? onFormSubmit(event) : onFormEdit(event) }>
        
            <h1> {isNewItem()? 'Create new item!': "Edit item!"} </h1>

            <label>
                Title:
                <input
                    value = {titleState}
                    onInput = {(e) => setTitle(e.target.value)}
                    required
                    minLength = '3'
                    maxLength = '27'
                    placeholder = "Item Title, e.g Go surfing at 6pm" />
            </label>

            <label>
                Body:
                <textarea
                    value = {bodyState}
                    onInput = {(e) => setBody(e.target.value)}
                    required
                    minLength = '5'
                    maxLength = '300'
                    placeholder = "Item Body, e.g Remember to book tickets to Hawaii" />
            </label>

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


            {submitEditButton}  
            {deleteButton}
            {completeIncompleteButton}
            
        </form>
    </div>)
}

export default NewItem