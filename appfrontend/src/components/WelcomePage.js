import React from "react";
import { Button, Container, Header, Segment } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

const WelcomePage = () => {
  const history = useHistory();

  return (
    <>
      <Segment inverted textAlign="center" style={{ height: "100vh", padding: "1em 0em" }} vertical>
        <Container></Container>
        <Container text>
          <p style={{ color: "whie", fontSize: "5em", fontWeight: "bold", marginBottom: 0, marginTop: "3em" }}>
            To Do Application
          </p>
          {/*           <Header
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
          */}
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
        </Container>
      </Segment>
    </>
  );
};

export default WelcomePage;
