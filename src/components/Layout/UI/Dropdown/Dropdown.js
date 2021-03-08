import React from "react";
import "./Dropdown.css";

const dropdown = (props) =>
  props.show ? <div className="Dropdown" onClick={props.clicked}></div> : null;

export default dropdown;
