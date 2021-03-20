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
import * as actionType from '../../hoc/Store/actions'



class BurgerBuilder extends Component {
  state = {
   
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0,

  
    
    purchasing: false,
    loading: false,
    error: false,
  };
  componentDidMount() {
    console.log(this.props);
    // axios
    //   .get(
    //     "https://my-react-burger-5fc4f-default-rtdb.firebaseio.com/ingredients.json"
    //   )
    //   .then(({ data }) => {
    //     this.setState({ ingredients: data });
    //   })
    //   .catch((error) => {
    //     this.setState({ error: true });
    //   });
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
  // addIncrementHandler = (type) => {
  //   const oldCount = this.state.ingredients[type];
  //   const newCount = oldCount + 1;
  //   const updatedIngredients = { ...this.state.ingredients };

  //   updatedIngredients[type] = newCount;

  //   const aditionPrice = INGREDIENT_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice + aditionPrice;
  //   this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
  //   this.updatePurchaseState(updatedIngredients);
  // };

  // removeIngredientHandler = (type) => {
  //   const oldCount = this.state.ingredients[type];
  //   if (oldCount <= 0) {
  //     return;
  //   }
  //   const newCount = oldCount - 1;
  //   const updatedIngredients = { ...this.state.ingredients };

  //   updatedIngredients[type] = newCount;

  //   const deductionPrice = INGREDIENT_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice - deductionPrice;
  //   this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
  //   this.updatePurchaseState(updatedIngredients);
  // };

  purchasingHandler = () => {
    this.setState({ purchasing: true });
  };
  modalClosedHandler = () => {
    this.setState({ purchasing: false });
  };
  purchasecontinueHandler = () => {
    
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
    let burger = this.state.error ? (
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
    if (this.state.loading) {
      OrderSummeries = <Spinner />;
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
  ing: state.ingredients,
  price: state.totalPrice
  }
}

const mapDispatchToProps=(dispatch)=>{
  return{
    onIngredientAdded: (ingName)=>dispatch({type: actionType.ADD_INGREDIENTS, ingredientName: ingName}),
    onIngredientRemoved : (ingName)=>dispatch({type: actionType.REMOVE_INGREDIENTS, ingredientName: ingName})
  }

}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
