import axios from "axios";
import instance from "../../axios-orders";
import React, { Component } from "react";
import Order from "../CheckoutSummery/Order/Order";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from '../../hoc/Store/actions/index';
import {connect} from 'react-redux';
import Spinner from '../../components/Layout/UI/Spinner/Spinner'

class Orders extends Component {
  state = {
    loading: true,
  };
  componentDidMount() {
  this.props.onfetchOrders();
  }

  render() {
    console.log('............................: ',this.props.orders)
    let orders = <Spinner />
    if(!this.props.loading){
      orders = this.props.orders.map((order) => (
        <Order
          key={order.key}
          ingredients={order.ingredients}
          price={order.price}
        />
      ))
    }
    return (
      <div>
        {orders}
      </div>
    );
  }
}

const mapStateToProps=(state)=>{
  return{
    orders: state.order.orders,
    loading: state.order.loading
  }
}

const mapDispatchToProps=(dispatch)=>{
  return{
    onfetchOrders: () => dispatch(actions.fetchorders())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
