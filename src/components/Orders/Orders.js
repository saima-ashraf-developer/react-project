import axios from "axios";
import instance from "../../axios-orders";
import React, { Component } from "react";
import Order from "../CheckoutSummery/Order/Order";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  };
  componentDidMount() {
    instance
      .get("/orders.json")
      .then(({ data }) => {
        const fetchedorders = [];
        for (let key in data) {
          fetchedorders.push({ ...data[key], id: key });
        }
        this.setState({ loading: false, orders: fetchedorders });
      })
      .catch((err) => {
        this.setState({ loading: false });
      });
  }

  render() {
    return (
      <div>
        {this.state.orders.map((order) => (
          <Order
            key={order.key}
            ingredients={order.ingredients}
            price={order.price}
          />
        ))}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);
