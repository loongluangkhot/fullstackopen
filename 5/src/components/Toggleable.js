import React, { useState, forwardRef, useImperativeHandle } from "react";

export const Toggleable = forwardRef((props, ref) => {
  const [active, setActive] = useState(false);
  const showWhenActive = active ? {} : { display: "none" };
  const hideWhenActive = active ? { display: "none" } : {};

  useImperativeHandle(ref, () => ({
    toggleActive: () => setActive(!active),
  }));

  return (
    <div>
      <div style={hideWhenActive}>
        <button onClick={() => setActive(true)}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenActive}>
        {props.children}
        <button onClick={() => setActive(false)}>cancel</button>
      </div>
    </div>
  );
});
