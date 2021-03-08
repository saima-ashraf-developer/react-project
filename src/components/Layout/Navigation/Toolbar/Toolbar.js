import React from "react";
import "./Toolbar.css";
import Logo from "../../../Logo/Logo";
import NavigationItems from "../../Navigation/Toolbar/NavigationItems/NavigationItems";
import Menu from "../../../Menu/Menu";

const toolbar = (props) => (
  <header className="Toolbar">
    <Menu clicked={props.change} />
    <Logo height="80%" />
    <nav className="Desktoponly">
      <NavigationItems />
    </nav>
  </header>
);

export default toolbar;
