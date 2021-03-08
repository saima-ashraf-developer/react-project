import React from "react";
import NavigationItems from "../../Toolbar/NavigationItems/NavigationItems";
import styles from "./SideDrawer.module.css";
import Logo from "../../../../Logo/Logo";
import Dropdown from "../../../UI/Dropdown/Dropdown";
import Aux from "../../../../../hoc/Aux";

const sidedrawer = (props) => {
  let attachedClasses = [styles.SideDrawer, styles.Close];
  if (props.open) {
    attachedClasses = [styles.SideDrawer, styles.open];
  }
  return (
    <Aux>
      <Dropdown show={props.open} clicked={props.closed} />
      <div className={attachedClasses.join(" ")}>
        <Logo height="11%" style={{ marginBottom: "32px" }} />
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Aux>
  );
};

export default sidedrawer;
