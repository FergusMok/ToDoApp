import React, { Component } from "react";
import { Button, Container, Header, Icon, Menu, Segment } from "semantic-ui-react";
import { Link, useHistory } from "react-router-dom";

const WelcomePage = () => {
  const history = useHistory();

  const HomepageHeading = (
    <Container text>
      <Header
        as="h1"
        content="To Do Application!"
        inverted
        style={{
          fontSize: "4em",
          fontWeight: "normal",
          marginBottom: 0,
          marginTop: "3em",
        }}
      />
      <Header
        as="h2"
        content="Do whatever you want when you want to."
        inverted
        style={{
          fontSize: "1.7em",
          fontWeight: "normal",
          marginTop: "1.5em",
        }}
      />
      <Button.Group style={{ marginRight: "25vh" }}>
        <Button color="green" size="large" onClick={() => history.push("/login")}>
          Login
        </Button>
        <Button.Or text="/" />
        <Button color="teal" size="large" onClick={() => history.push("/register")}>
          Register
        </Button>
      </Button.Group>
      {/*       <Button primary size="large">
        Get Started
        <Icon name="right arrow" />
      </Button>
      <Button secondary size="large">
        Get Started
        <Icon name="right arrow" />
      </Button>
 */}{" "}
    </Container>
  );

  const fixed = false;
  return (
    <>
      <Segment inverted textAlign="center" style={{ height: "100vh", padding: "1em 0em" }} vertical>
        <Menu fixed={fixed ? "top" : null} inverted={!fixed} pointing={!fixed} secondary={!fixed} size="large">
          <Container>
            {/*             <Menu.Item as="a" active>
              Home
            </Menu.Item>
            <Menu.Item as="a">Work</Menu.Item>
            <Menu.Item as="a">Company</Menu.Item>
            <Menu.Item as="a">Careers</Menu.Item>
            <Menu.Item position="right">
              <Button as="a" inverted={!fixed}>
                Log in
              </Button>
              <Button as="a" inverted={!fixed} primary={fixed} style={{ marginLeft: "0.5em" }}>
                Sign Up
              </Button>
          
          </Menu.Item>
          */}
          </Container>
        </Menu>
        {HomepageHeading}
      </Segment>
    </>
  );
};

export default WelcomePage;
