import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import {Sticky} from 'semantic-ui-react'
import { navigate }  from "../redux/NavigationBar"


const NavigationBar = () => {
    const dispatch = useDispatch();
    // Conditional Rendering...
    const activated = useSelector(state => state.navigationState)
    const incompleteStr = "Incomplete" === activated ? ' active' : ""
    const createStr = "Create" === activated ? ' active' : ""
    const completeStr = "Completed" === activated ? ' active' : ""

    return (
        <Sticky>
        <div className ="ui secondary pointing menu" style={{backgroundColor: 'white'}}>
                <Link to='/incomplete'>
                <div onClick = {() => dispatch(navigate("Incomplete"))}>
                   <p className ={`item${incompleteStr}`}>
                        Not Completed
                    </p>
                </div>
                </Link>

                <Link to='/create'>
                <div onClick = {() => dispatch(navigate("Create"))}>
                        <p className = {`item${createStr}`}>
                        Create
                        </p>
                </div>
                </Link>

                <div onClick = {() => dispatch(navigate("Completed"))}>
                     <Link to ='/completed' >
                     <p className = {`item${completeStr}`}>
                        Completed
                    </p>
                     </Link>
                </div>

        </div>
        </Sticky>
    );
}

export default NavigationBar 
