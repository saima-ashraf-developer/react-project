import * as actionType from './actionTypes';
import axios from '../../../axios-orders'

export const purchaseBurgerSuccess = (id, orderData)=>{
    return{
        type: actionType.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

export const purchaseBurgerFail=(error)=>{
    return{
        type: actionType.PURCHASE_BURGER_FAIL,
        error: error
    }
}
export const purchaseBurgerStart=()=>{
    return{
        type:actionType.PURCHASE_BURGER_START
    }
}
export const purchaseBurger=(orderData)=>{
    return dispatch=>{
        dispatch(purchaseBurgerStart());
        axios
        .post("/orders.json", orderData)
        .then((response) => {
            console.log(response)
          dispatch(purchaseBurgerSuccess(response.data.name, orderData))
        })
        .catch((error) => {
          dispatch(purchaseBurgerFail(error))
        });
    }
}
export const purchaseinit=()=>{
    return{
        type: actionType.PURCHASE_INIT
    }
}

export const fetchOrdersSuccess = (orders)=>{
    console.log(orders);
    return{
        type: actionType.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchOrdersFail =(error)=>{
    return{
        type: actionType.FETCH_ORDERS_FAIL,
        error: error
    }
}
export const fetchOrdersStart=()=>{
    return{
        type: actionType.FETCH_ORDERS_START
    }
}

export const fetchorders=()=>{
    return dispatch=>{
        dispatch(fetchOrdersStart())
    axios
      .get("/orders.json")
      .then(({ data }) => {
        const fetchedorders = [];
        for (let key in data) {
          fetchedorders.push({ ...data[key], id: key });
        }
        dispatch(fetchOrdersSuccess(fetchedorders))
      })
      .catch((err) => {
       dispatch(fetchOrdersFail(err))
      });
    }
}