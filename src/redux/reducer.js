import { ADD_TO_CART, REMOVE_FROM_CART, EMPTY_CART, UPDATE_QUANTITY } from "./constant";

const initialState = [];

export const cartData = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const existingProductIndex = state.findIndex(item => item.id === action.payload.id);
      if (existingProductIndex !== -1) {
        const updatedCart = [...state];
        updatedCart[existingProductIndex].quantity += 1;  // Increment quantity
        return updatedCart;
      }
      return [...state, { ...action.payload, quantity: 1 }];
    case REMOVE_FROM_CART:
      return state.filter((item) => item.id !== action.payload);
    case EMPTY_CART:
      return [];
    case UPDATE_QUANTITY:
      return state.map(item =>
        item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
      );
    default:
      return state;
  }
};
