import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { cartData } from "./reducer";
import { productData } from "./productReducer";
import productSaga from "./productSaga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    cartData,
    productData,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(productSaga);

export default store;