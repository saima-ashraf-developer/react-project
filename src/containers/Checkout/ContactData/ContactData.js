import React, { Component } from "react";
import axios from "../../../axios-orders";
import Spinner from "../../../components/Layout/UI/Spinner/Spinner";
import "./ContactData.css";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalcode: "",
    },
    loading: false,
  };
  orderHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: "max",
        address: {
          street: "test street 1",
          zipcode: 55752,
          country: "germeny",
        },
        email: "test@test.com",
      },
      deliveryMethod: "fastest",
    };
    axios
      .post("/orders.json", order)
      .then((response) => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch((error) => {
        this.setState({ loading: false });
      });
  };
  render() {
    let form = (
      <form>
        <input
          style={{ display: "block" }}
          type="text"
          name="name"
          placeholder="your name"
        />
        <input
          type="text"
          style={{ display: "block" }}
          name="email"
          placeholder="your email"
        />
        <input
          type="text"
          style={{ display: "block" }}
          name="street"
          placeholder="street"
        />
        <input
          type="text"
          style={{ display: "block" }}
          name="postal"
          placeholder="postalcode"
        />
        <button className="Button" onClick={this.orderHandler}>
          ORDER
        </button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }

    return (
      <div className="ContactData">
        <h4 style={{ textAlign: "center" }}>Enter Your Contact Data</h4>
        {form}
      </div>
    );
  }
}
export default ContactData;
