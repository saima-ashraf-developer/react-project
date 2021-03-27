import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";
import CheckoutSummery from "../../components/CheckoutSummery/CheckoutSummery";
import ContactData from "./ContactData/ContactData";
import {connect} from 'react-redux';
import Aux from '../../hoc/Aux';


class Checkout extends Component {

  
  purchaseCancelHandler = () => {
    this.props.history.goBack();
    console.log(this.props.match.path);
  };
  purchaseContinueHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };
  render() {
    let summery = <Redirect to='/' />
    if(this.props.ing){
      const purchaseRedirect = this.props.purchased? <Redirect to='/' /> : null;
     summery= (
        <div>
          {purchaseRedirect}
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
    
      )
    }
    return summery
  }
}

const mapStateToProps =(state)=>{
  return{
    ing: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  }
}


export default connect(mapStateToProps)(Checkout);
