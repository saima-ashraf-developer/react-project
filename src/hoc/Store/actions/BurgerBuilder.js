import * as actionTypes from './actionTypes';
import instance from '../../../axios-orders'

export const addIngredient=(name)=>{
    return{
        type: actionTypes.ADD_INGREDIENTS,
        ingredientName: name
    }
}
export const fetchIngredientsFailed=()=>{
    return{
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

 export const removeIngredient=(name)=>{
    return{
        type: actionTypes.REMOVE_INGREDIENTS,
        ingredientName: name
    }
}
export const setIngredients=(ingredients)=>{
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
}

export const initIngredients =()=>{
    return dispatch=>{
        instance
          .get(
            "ingredients.json"
          )
          .then((response) => {
           dispatch(setIngredients(response.data))
           console.log(response.data)
          })
          .catch((error) => {
            dispatch(fetchIngredientsFailed())
          });
    }
}