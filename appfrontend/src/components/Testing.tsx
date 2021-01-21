import React, { useState } from "react";

const Testing = () => {
  const [state, setState] = useState({
    name: "",
    surname: "",
  });

  const setName = () =>
    setState((prevState) => {
      return { name: "Bob", surname: prevState.surname };
    });

  return (
    <>
      <button onClick={() => setName()}>Click me to change name to Bob</button>

      <button
        onClick={() =>
          setState((prevState) => {
            return { name: prevState.name, surname: "Chan" };
          })
        }
      >
        Click me to change surname to Chan
      </button>

      <button onClick={() => setState({ name: "", surname: "" })}>Click me to reset</button>

      <button onClick={() => console.log(state)}>Click me to print</button>
    </>
  );
};

export { Testing };
