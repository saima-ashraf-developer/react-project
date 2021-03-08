import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import "./Layout.css";
import Sidedrawer from "./Navigation/Toolbar/SideDrawer/SideDrawer";
import Toolbar from "./Navigation/Toolbar/Toolbar";

class Layout extends Component {
  state = {
    showSideDrawer: false,
  };
  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  };
  sideDrawerTogglehandler = () => {
    this.setState((prevState) => {
      return {
        showSideDrawer: !prevState.showSideDrawer,
      };
    });
  };
  render() {
    return (
      <Aux>
        <Toolbar change={this.sideDrawerTogglehandler} />
        <Sidedrawer
          closed={this.sideDrawerClosedHandler}
          open={this.state.showSideDrawer}
        />

        <main className="Contents">{this.props.children}</main>
      </Aux>
    );
  }
}

export default Layout;
