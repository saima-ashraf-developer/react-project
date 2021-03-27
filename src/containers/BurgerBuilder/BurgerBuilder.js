import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import Burger from "../../components/Layout/Burger/Burger";
import BuildControls from "../../components/Layout/Burger/BuildControls/BuildControls";
import Modal from "../../components/Layout/UI/Modal/Modal";
import OrderSummery from "../../components/Layout/Burger/OrderSummery/OrderSummery";
import axios from "../../axios-orders";
//mport Spinner from "../../components/Layout/UI/Spinner/Spinner";
import Spinner from "../../components/Layout/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import {connect} from 'react-redux';
import * as actions from '../../hoc/Store/actions/index'



class BurgerBuilder extends Component {
  state = {
    purchasing: false,
  };
  componentDidMount() {
    console.log(this.props);
    this.props.onInitIngredient();
    
  }

  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igkey) => {
        return ingredients[igkey];
      })
      .reduce((acc, cu) => {
        return acc + cu;
      }, 0);
    return sum > 0 ;
  };

  purchasingHandler = () => {
    this.setState({ purchasing: true });
  };
  modalClosedHandler = () => {
    this.setState({ purchasing: false });
  };
  purchasecontinueHandler = () => {
    this.props.oninItPurchase();
    this.props.history.push('/checkout');

  };

  render() {
    const disabledInfo = {
      ...this.props.ing,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let OrderSummeries = null;
    let burger = this.props.error ? (
      <p> ingredients cant b loaded</p>
    ) : (
      <Spinner />
    ); 
    if (this.props.ing) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ing} />
          <BuildControls
            addIngredient={this.props.onIngredientAdded}
            removeIngredient={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            price={this.props.price}
            purchasable={this.updatePurchaseState(this.props.ing)}
            ordered={this.purchasingHandler}
          />
        </Aux>
      );
      OrderSummeries = (
        <OrderSummery
          ingredients={this.props.ing}
          price={this.props.price}
          purchaseCancel={this.modalClosedHandler}
          purchaseContinue={this.purchasecontinueHandler}
        />
      );
    } 
    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.modalClosedHandler}
        >
          {OrderSummeries}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps=(state)=>{
  return{
    price: state.burgerBuilder.totalPrice,
    ing: state.burgerBuilder.ingredients,
  error: state.burgerBuilder.error
  }
}

const mapDispatchToProps=(dispatch)=>{
  return{
    onIngredientRemoved : (ingName)=>dispatch(actions.removeIngredient(ingName)),
    onIngredientAdded: (ingName)=>dispatch(actions.addIngredient(ingName)),
    onInitIngredient: ()=>dispatch(actions.initIngredients()),
    oninItPurchase: ()=>dispatch(actions.purchaseinit())
  }

}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
