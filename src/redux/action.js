import { ADD_TO_CART, REMOVE_FROM_CART, EMPTY_CART, PRODUCT_LIST, UPDATE_QUANTITY } from './constant';

export const addToCart = (product) => {
  return (dispatch, getState) => {
    const existingProduct = getState().cartData.find(item => item.id === product.id);
    if (existingProduct) {
      alert("This product is already in your cart!");
    } else {
      dispatch({ type: ADD_TO_CART, payload: product });
    }
  };
};

export const removeFromCart = (productId) => ({ type: REMOVE_FROM_CART, payload: productId });
export const emptyCart = () => ({ type: EMPTY_CART });
export const getProductList = () => ({ type: PRODUCT_LIST });


export const updateQuantity = (id, quantity) => ({
  type: UPDATE_QUANTITY,
  payload: { id, quantity },
});
