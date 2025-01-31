import { PRODUCT_LIST } from "./constant";

export const productList = () => {
  return {
    type: PRODUCT_LIST,
  };
};
// If productSearch action doesn't exist, define it like this:
export const productSearch = (query) => {
  return {
    type: 'PRODUCT_SEARCH',
    payload: query,
  };
};



