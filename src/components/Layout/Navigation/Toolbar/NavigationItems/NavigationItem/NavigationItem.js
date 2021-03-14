import { checkPropTypes } from "prop-types";
import React from "react";
import { NavLink } from "react-router-dom";
import "./NavigationItem.css";

const navigationItem = (props) => (
  <li className="Navigationitem">
    <NavLink
      className="Navigationitem.active"
      to={props.link}
      exact={props.exact}
    >
      {props.children}
    </NavLink>
  </li>
);

export default navigationItem;
