import { checkPropTypes } from "prop-types";
import React from "react";
import "./NavigationItem.css";

const navigationItem = (props) => (
  <li className="Navigationitem">
    <a className="Navigationitem.active" href={props.link}>
      {props.children}
    </a>
  </li>
);

export default navigationItem;
