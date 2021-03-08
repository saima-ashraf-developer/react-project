import React from "react";
import Aux from "../../../../hoc/Aux";

const ordersummery = (props) => {
  const ingredientsummery = Object.keys(props.ingredients).map((igkey) => {
    return (
      <li key={igkey}>
        <span style={{ textTransform: "capitalize" }}>{igkey}</span>:
        {props.ingredients[igkey]}
      </li>
    );
  });
  const style = {
    backgroundColor: "red",
    color: "white",
  };
  return (
    <Aux>
      <h3>Your Burger</h3>
      <p>A delicious burger with following ingredients:</p>
      <ul>{ingredientsummery}</ul>
      <p>
        <strong>Total Price: {props.price.toFixed(2)}</strong>
      </p>
      <p>Continue to Checkout?</p>
      <button style={style} onClick={props.purchaseCancel}>
        CANCEL
      </button>
      <button
        style={{ color: "white", backgroundColor: "green" }}
        onClick={props.purchaseContinue}
      >
        CONTINUE
      </button>
    </Aux>
  );
};

export default ordersummery;
