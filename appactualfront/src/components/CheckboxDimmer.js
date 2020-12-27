import React, { useState, useEffect } from "react";
import { Button, Dimmer, Image, Segment } from "semantic-ui-react";

const CheckboxDimmer = () => {
  const [active, setActive] = useState(false);

  const handleShow = () => setActive(true);
  const handleHide = () => setActive(false);

  return (
    <div>
      <Dimmer.Dimmable as={Segment} blurring dimmed={active}>
        <Dimmer active={active} inverted onClickOutside={handleHide} />
        <p>
          <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
        </p>
      </Dimmer.Dimmable>

        <button type="button" icon="plus" onClick={handleShow} />
        <button type="button" icon="minus" onClick={handleHide} />
    </div>
  );
};

export default CheckboxDimmer;
