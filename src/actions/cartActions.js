import { ADD_TO_CART } from "../types";

export const addToCart = (items, products) => (dispatch) => {
  const cartItems = items.slice();
  cartItems.forEach (item => {
    let alreadyExist = false;
    if (item._id === products._id){
      alreadyExist = true;
      item.count++;
    }
  });
  if(!alreadyExist){
    cartItems.push({...product, count : 1});
  }
  dispatch({
    type: ADD_TO_CART,
    payload: { cartItems }
  });
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

