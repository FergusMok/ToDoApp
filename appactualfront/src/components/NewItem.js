import React, {useState} from 'react'
import { Button } from 'semantic-ui-react'
import axios from 'axios'

const API_LINK = 'http://localhost:5000/api/v1/items'


const NewItem = () => {
    const [titleState, setTitle] = useState("")
    const [bodyState, setBody] = useState("")

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

    return <form onSubmit = {onFormSubmit}>
            <div className="ui form" >
                <div className="Title">
                    <label>Title</label>
                    <input type="text" value = {titleState} onInput = {(e) => setTitle(e.target.value)} name="first-name" placeholder="Title"/>
                </div>
                <div className="field">
                    <label>Body</label>
                    <textarea value = {bodyState} onInput = {(e) => setBody(e.target.value)} placeholder = "Body"></textarea>
                </div>
                <Button type="submit" content='Submit' primary />
            </div>
        </form>
}

export default NewItem