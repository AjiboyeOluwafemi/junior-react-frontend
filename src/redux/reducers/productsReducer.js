import {
  CREATE_ITEM,
  UPDATE_CATEGORY,
  UPDATE_PRICE,
  DECREASE_ITEM,
  DELETE_ITEM,
  CLEAR_CART,
  CART_TOTAL_AMOUNT
} from "./actions.js";

//Reducers
const initialState = {
  //contains items added to cart
  cart: [],
  // cart total value
  cartTotal: {},
  //to chose the index of array for category display
  category: 0,
  //to chose the index of array for currency price & symbol display
  price: 0
};

export default function ProductsReducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case CREATE_ITEM:
      const itemIndex = state.cart.findIndex((item) => item.id === payload.id);
      itemIndex >= 0
        ? (state.cart[itemIndex].quantity += 1)
        : (state.cart = [...state.cart, payload]);
      return { ...state, cart: [...state.cart] };

    case UPDATE_CATEGORY:
      return { ...state, category: payload };

    case UPDATE_PRICE:
      return { ...state, price: payload };

    case DECREASE_ITEM:
      const ItemIndex = state.cart.findIndex((item) => item.id === payload);
      if (state.cart[ItemIndex].quantity > 1) {
        state.cart[ItemIndex].quantity -= 1;
        return { ...state, cart: [...state.cart] };
      } else if (state.cart[ItemIndex].quantity === 1) {
        const cart = state.cart.filter((item) => item.id !== payload);
        return { ...state, cart };
      }
      break;

    case DELETE_ITEM:
      const cart = state.cart.filter((item) => item.id !== payload);
      return { ...state, cart };

    case CLEAR_CART:
      return { ...state, cart: [] };

    case CART_TOTAL_AMOUNT:
      const { total, cartQuantity } = state.cart.reduce(
        (cartTotal, cartItem) => {
          const { prices, quantity } = cartItem;
          const itemTotal = prices[state.price].amount * quantity;

          cartTotal.total += itemTotal;
          cartTotal.cartQuantity += quantity;
          return cartTotal;
        },
        { total: 0, cartQuantity: 0 }
      );
      state.cartTotal = total;

      return { ...state, cartTotal: { total: total.toFixed(2), cartQuantity } };

    default:
      break;
  }

  return state;
}
