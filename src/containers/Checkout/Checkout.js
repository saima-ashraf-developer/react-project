import React, { Component } from "react";
import { Route } from "react-router-dom";
import CheckoutSummery from "../../components/CheckoutSummery/CheckoutSummery";
import ContactData from "./ContactData/ContactData";
import {connect} from 'react-redux';

class Checkout extends Component {
  
  purchaseCancelHandler = () => {
    this.props.history.goBack();
    console.log(this.props.match.path);
  };
  purchaseContinueHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };
  render() {
    return (
      <div>
        <CheckoutSummery
          ingredients={this.props.ing}
          purchaseCancel={this.purchaseCancelHandler}
          purchaseContinue={this.purchaseContinueHandler}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          component={ContactData}
        />
      </div>
    );
  }
}

const mapStateToProps =(state)=>{
  return{
    ing: state.ingredients
  }
}
export default connect(mapStateToProps)(Checkout);
