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

let INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 1,
  meat: 1.3,
  bacon: 0.7,
};
class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0,

    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false,
  };
  componentDidMount() {
    console.log(this.props);
    axios
      .get(
        "https://my-react-burger-5fc4f-default-rtdb.firebaseio.com/ingredients.json"
      )
      .then(({ data }) => {
        this.setState({ ingredients: data });
      })
      .catch((error) => {
        this.setState({ error: true });
      });
  }

  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igkey) => {
        return ingredients[igkey];
      })
      .reduce((acc, cu) => {
        return acc + cu;
      }, 0);
    this.setState({ purchasable: sum > 0 });
  };
  addIncrementHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const newCount = oldCount + 1;
    const updatedIngredients = { ...this.state.ingredients };

    updatedIngredients[type] = newCount;

    const aditionPrice = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + aditionPrice;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const newCount = oldCount - 1;
    const updatedIngredients = { ...this.state.ingredients };

    updatedIngredients[type] = newCount;

    const deductionPrice = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - deductionPrice;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  };

  purchasingHandler = () => {
    this.setState({ purchasing: true });
  };
  modalClosedHandler = () => {
    this.setState({ purchasing: false });
  };
  purchasecontinueHandler = () => {
    const queryParams = [];
    for (let i in this.state.ingredients)
      queryParams.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.state.ingredients[i])
      );
    queryParams.push(`price=${this.state.totalPrice}`);
    const queryString = queryParams.join("&");
    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryString,
    });
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients,
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
    if (this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            addIngredient={this.addIncrementHandler}
            removeIngredient={this.removeIngredientHandler}
            disabled={disabledInfo}
            price={this.state.totalPrice}
            purchasable={this.state.purchasable}
            ordered={this.purchasingHandler}
          />
        </Aux>
      );
      OrderSummeries = (
        <OrderSummery
          ingredients={this.state.ingredients}
          price={this.state.totalPrice}
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
export default withErrorHandler(BurgerBuilder, axios);
