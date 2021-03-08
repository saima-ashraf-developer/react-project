import React, { Component } from "react";
import CheckoutSummery from "../../components/CheckoutSummery/CheckoutSummery";

class Checkout extends Component {
  state = {
    ingredients: {
      salad: 1,
      cheese: 1,
      bacon: 1,
    },
  };
  purchaseCancelHandler = () => {
    this.props.history.goBack();
  };
  purchaseContinueHandler = () => {
    alert("thanks");
  };
  render() {
    return (
      <div>
        <CheckoutSummery
          ingredients={this.state.ingredients}
          purchaseCancel={this.purchaseCancelHandler}
          purchaseContinue={this.purchaseContinueHandler}
        />
      </div>
    );
  }
}
export default Checkout;
