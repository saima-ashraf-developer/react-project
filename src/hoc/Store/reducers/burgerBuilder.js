import * as actionType from '../actions/actionTypes';

const initialState={
    ingredients: null,
    totalPrice: 4,
    error: false,
}
let INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 1,
    meat: 1.3,
    bacon: 0.7,
  };

const reducer=(state=initialState, action)=>{
    switch(action.type){
        case(actionType.ADD_INGREDIENTS):
        return{
            ...state,
            ingredients: {
                ...state.ingredients,
                [action.ingredientName]: state.ingredients[action.ingredientName] +1
            },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName] 
        }
        case(actionType.REMOVE_INGREDIENTS):
        return{
            ...state,
            ingredients: {
                ...state.ingredients,
                [action.ingredientName]: state.ingredients[action.ingredientName] -1
            },
            totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName] 

        }
        case(actionType.SET_INGREDIENTS):
        return{
            ...state,
            ingredients: action.ingredients,
            error: false,
            totalPrice:4
        }
        case(actionType.FETCH_INGREDIENTS_FAILED):
        return{
            error: true,
        }
        default: return state; 
    }

}
export default reducer;