import React from "react";

function SubmitButton(props) {
  return (
    <input
      name={props.name}
      value={props.name}
      className={"btn mx-2 my-2 px-5 " + props.className}
      onClick={e => props.onClick(e.target.value)}
      type="submit"
    />
  );
}

export default SubmitButton;
