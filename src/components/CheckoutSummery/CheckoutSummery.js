import React from "react";
import Burger from "../Layout/Burger/Burger";
import myclass from "./CheckoutSummery.module.css";

const checkoutSummery = (props) => {
  return (
    <div className={myclass.CheckoutSummery}>
      <h1>Hopefully it taste well</h1>
      <div style={{ width: "100px", margin: "auto" }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <button
        style={{ color: "white", backgroundColor: "red" }}
        onClick={props.purchaseCancel}
      >
        CANCEL
      </button>
      <button
        style={{ color: "white", backgroundColor: "green" }}
        onClick={props.purchaseContinue}
      >
        CONTINUE
      </button>
    </div>
  );
};
export default checkoutSummery;
