import React from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { navigate }  from "../redux/NavigationBar"

const NavigationBar = () => {
    const dispatch = useDispatch();

    // Conditional Rendering...
    const activated = useSelector(state => state.navigationState)
    const homeStr = "Home" === activated ? ' active' : ""
    const completeStr = "Completed" === activated ? ' active' : ""
    const incompletStr = "Incomplete" === activated ? ' active' : ""

    return (
        <div className ="ui sticky secondary pointing menu">
                <div onClick = {() => dispatch(navigate("Home"))}>
                        <p className = {`item${homeStr}`}>
                        Home
                        </p>
                </div>

                <div onClick = {() => dispatch(navigate("Completed"))}>
{/*                     <Link to ='/' >
 */}                    <p className = {`item${completeStr}`}>
                        Completed
                    </p>
{/*                     </Link>
 */}                </div>

                <div onClick = {() => dispatch(navigate("Incomplete"))}>
{/*                     <Link to = 'about'>
 */}                    <p className ={`item${incompletStr}`}>
                        Not Completed
                    </p>
{/*                     </Link>
 */}                </div>
        </div>
    );
}

export default NavigationBar 
