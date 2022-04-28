//Actions
export const CREATE_ITEM = "[Item Action] Create Item";
export const UPDATE_CATEGORY = "[Category Action] Update Category";
export const UPDATE_PRICE = "[Price Action] Update Price";
export const DECREASE_ITEM = "[Item Action] Decrease Item";
export const DELETE_ITEM = "[Item Action] Delete Item";
export const CLEAR_CART = "[Cart Action] Clear Cart";
export const CART_TOTAL_AMOUNT = "[Cart Action] Total Cart";

//action used to add item to cart
export const addItemAction = (content) => {
  return {
    type: CREATE_ITEM,
    payload: content
  };
};
//action used to update the index of array for category type picked
export const updateCategoryAction = (index) => {
  return {
    type: UPDATE_CATEGORY,
    payload: index
  };
};
//action used to update the index of array for currency type picked
export const updatePriceAction = (index) => {
  return {
    type: UPDATE_PRICE,
    payload: index
  };
};
//action used to decrease items in cart
export const decreaseItemAction = (id) => {
  return {
    type: DECREASE_ITEM,
    payload: id
  };
};
//action used to delete item from cart
export const deleteItemAction = (id) => {
  return {
    type: DELETE_ITEM,
    payload: id
  };
};
//action used to reset cart
export const clearCartAction = () => {
  return {
    type: CLEAR_CART
  };
};
//action used to sum up cart
export const cartTotalAction = () => {
  return {
    type: CART_TOTAL_AMOUNT
  };
};
