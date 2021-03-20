import React, { Component } from "react";
import axios from "../../../axios-orders";
import Spinner from "../../../components/Layout/UI/Spinner/Spinner";
import "./ContactData.css";
import Input from "../../../components/Layout/UI/Input/Input";
import {connect} from 'react-redux';

class ContactData extends Component {
  state = {
    orderform: {
      name: {
        elementType: "text",
        elementConfig: {
          type: "text",
          placeholder: "Your Name",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touch: false,
      },
      street: {
        elementType: "text",
        elementConfig: {
          type: "text",
          placeholder: "Street",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touch: false,
      },
      zipcode: {
        elementType: "text",
        elementConfig: {
          type: "text",
          placeholder: "ZIP Code",
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5,
        },
        valid: false,
        touch: false,
      },
      country: {
        elementType: "text",
        elementConfig: {
          type: "text",
          placeholder: "country",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touch: false,
      },
      email: {
        elementType: "text",
        elementConfig: {
          type: "email",
          placeholder: "Your e-mail",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touch: false,
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayvalue: "Fastest" },
            { value: "cheapest", displayvalue: "Cheapest" },
          ],
        },
        validation: {},
        value: "",
        valid: true,
      },
    },
    formIsValid: false,
    loading: false,
  };
  checkValidity(value, rules) {
    let isvalid = true;
    if (rules.required) {
      isvalid = value.trim() !== "" && isvalid;
    }
    if (rules.minLength) {
      isvalid = value.length >= rules.minLength && isvalid;
    }
    if (rules.maxLength) {
      isvalid = value.length <= rules.maxLength && isvalid;
    }
    return isvalid;
  }
  orderHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const formData = {};
    for (let formElementIdentifier in this.state.orderform) {
      formData[formElementIdentifier] = this.state.orderform[
        formElementIdentifier
      ].value;
    }
    const order = {
      ingredients: this.props.ing,
      price: this.props.price,
      orderData: formData,
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
  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = { ...this.state.orderform };
    const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };

    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touch = true;

    let formIsvalid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsvalid = updatedOrderForm[inputIdentifier].valid && formIsvalid;
    }
    console.log(formIsvalid);
    console.log(updatedFormElement);
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    this.setState({ orderform: updatedOrderForm, formIsValid: formIsvalid });
  };
  render() {
    let formElementArray = [];

    for (let key in this.state.orderform) {
      formElementArray.push({
        id: key,
        config: this.state.orderform[key],
      });
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementArray.map((formElement) => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            changed={(event) => this.inputChangedHandler(event, formElement.id)}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touch}
          />
        ))}
        <button className="Button" disabled={!this.state.formIsValid}>
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
const mapStateToProps=(state)=>{
  return{
    ing: state.ingredients,
    price: state.totalPrice
  }
}
export default connect(mapStateToProps)(ContactData);
