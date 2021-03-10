import React from "react";
import classes from "Orders.module.css";

const order = (props) => (
  <div className={classes.Order}>
    <p>Ingredients: salad</p>
    <p>
      Price: <strong>US 5.40</strong>
    </p>
  </div>
);

export default order;
