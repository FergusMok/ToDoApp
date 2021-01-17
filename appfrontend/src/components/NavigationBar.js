import React, { useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Sticky } from "semantic-ui-react";
import { navigate } from "../redux/NavigationBar";
import { logOut } from "../api/API_AUTHEN";
import { Button, Container, Menu } from "semantic-ui-react";

const NavigationBar = () => {
  const dispatch = useDispatch();
  // Conditional Rendering...
  const activated = useSelector((state) => state.navigationState);
  const name = useSelector((state) => state.userNameState);
  const incompleteBoo = "incomplete" === activated;
  const createBoo = "create" === activated;
  const completeBoo = "completed" === activated;
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    dispatch(navigate(location.pathname.slice(1)));
  }, []);

  /*   useEffect(() => {
    dispatch(navigate(location.pathname.slice(1)), []);
  });

 */
  const fixed = false;
  return (
    <Sticky>
      <div style={{ backgroundColor: "black" }}>
        <Menu
          backgroundColor="black"
          color="black"
          fixed={fixed ? "top" : null}
          inverted={!fixed}
          pointing={!fixed}
          secondary={!fixed}
          size="huge"
        >
          <Menu.Item as="a" style={{ marginBottom: "0.6vh" }}>
            {name}
          </Menu.Item>

          <Container>
            <Link to="/incomplete">
              <Menu.Item as="a" onClick={() => dispatch(navigate("incomplete"))} active={incompleteBoo}>
                Incomplete
              </Menu.Item>
            </Link>

            <Link to="/create">
              <Menu.Item as="a" onClick={() => dispatch(navigate("create"))} active={createBoo}>
                Create
              </Menu.Item>
            </Link>
            <Link to="/completed">
              <Menu.Item as="a" onClick={() => dispatch(navigate("completed"))} active={completeBoo}>
                Completed
              </Menu.Item>
            </Link>

            <Menu.Item position="right">
              <Button as="a" inverted={!fixed} style={{ marginLeft: "2vh" }} onClick={() => logOut(history)}>
                Log Out
              </Button>
            </Menu.Item>
          </Container>
        </Menu>
      </div>
    </Sticky>
  );
};

export default NavigationBar;
