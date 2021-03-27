import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {Provider} from 'react-redux';
import {applyMiddleware, createStore, compose,combineReducers} from 'redux';
import burgerBuilderreducer from './hoc/Store/reducers/burgerBuilder';
import thunk from 'redux-thunk';
import orderReducer from './hoc/Store/reducers/order'



const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootreducer= combineReducers({
  burgerBuilder: burgerBuilderreducer,
  order: orderReducer 
})

const store = createStore(rootreducer, composeEnhancers(applyMiddleware(thunk)) );

const app = (
  <Provider store={store}>
<BrowserRouter>
    <App />
  </BrowserRouter>
  </Provider>
  
);

ReactDOM.render(
  <React.StrictMode>{app}</React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
