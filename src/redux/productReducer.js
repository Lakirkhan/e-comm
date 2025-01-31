import { PRODUCT_LIST, SET_PRODUCT_LIST } from "./constant";

export const productData = (state = [], action) => {
  switch (action.type) {
    case "SET_PRODUCT_LIST":
      return action.payload;
    default:
      return state;
  }
};

