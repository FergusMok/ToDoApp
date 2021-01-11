import React, { useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Sticky } from "semantic-ui-react";
import { navigate } from "../redux/NavigationBar";
import { logOut } from "../api/API_AUTHEN";

const NavigationBar = () => {
  const dispatch = useDispatch();
  // Conditional Rendering...
  const activated = useSelector((state) => state.navigationState);
  const name = useSelector((state) => state.userNameState);
  const incompleteStr = "incomplete" === activated ? " active" : "";
  const createStr = "create" === activated ? " active" : "";
  const completeStr = "completed" === activated ? " active" : "";
  const history = useHistory();

  const location = useLocation();
  useEffect(() => {
    dispatch(navigate(location.pathname.slice(1)), []);
  });

  console.log(name);
  return (
    <Sticky>
      <div className="ui secondary pointing menu" style={{ backgroundColor: "white" }}>
        <Link to="/incomplete">
          <div onClick={() => dispatch(navigate("Incomplete"))}>
            <p className={`item${incompleteStr}`}>Not Completed</p>
          </div>
        </Link>

        <Link to="/create">
          <div onClick={() => dispatch(navigate("Create"))}>
            <p className={`item${createStr}`}>Create</p>
          </div>
        </Link>

        <div onClick={() => dispatch(navigate("Completed"))}>
          <Link to="/completed">
            <p className={`item${completeStr}`}>Completed</p>
          </Link>
        </div>
        <div> {`Hello, this is my name ${name}`} </div>
        <div onClick={() => logOut(history)}> Log out! </div>
      </div>
    </Sticky>
  );
};

export default NavigationBar;
